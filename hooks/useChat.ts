import { chatService } from '@/services/chatService';
import type { ChatUploadMedia } from '@/services/chatService';
import { socketService } from '@/services/socketService';
import { useAuthStore } from '@/stores/authStore';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Message {
    id: string;
    content: string;
    senderId: string;
    chatRoomId: string;
    status: 'sent' | 'delivered' | 'read' | 'failed';
    createdAt: string;
    sender?: {
        id: string;
        name: string;
        avatar?: string;
    };
}

interface UseChatOptions {
    roomId: string;
    onError?: (error: Error) => void;
}

interface SendMessageInput {
    content?: string;
    media?: ChatUploadMedia[];
}

export const useChat = ({ roomId, onError }: UseChatOptions) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [typingUser, setTypingUser] = useState<string | null>(null);
    const [connected, setConnected] = useState(false);
    const { user } = useAuthStore();
    const isMounted = useRef(true);
    const typingResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const extractCallBody = useCallback((payload: any) => {
        if (!payload) return null;
        return payload.call || payload.callData || payload.callMeta || payload.metadata?.call || null;
    }, []);

    // Load initial messages
    const loadMessages = useCallback(async () => {
        if (!roomId) return;

        try {
            setLoading(true);
            const result = await chatService.getRoomMessages(roomId);
            const data = result?.data?.data || [];

            console.log('[CHAT_DEBUG] load-messages:body', data);
            const callBodies = Array.isArray(data)
                ? data
                      .map((message: any) => extractCallBody(message))
                      .filter(Boolean)
                : [];
            if (callBodies.length) {
                console.log('[CHAT_DEBUG] load-messages:call-body', callBodies);
            }

            if (isMounted.current) {
                setMessages(Array.isArray(data) ? data.reverse() : []);
            }
        } catch (error) {
            console.error('Failed to load messages:', error);
            if (onError) {
                onError(error as Error);
            }
        } finally {
            if (isMounted.current) {
                setLoading(false);
            }
        }
    }, [roomId, onError]);

    const clearTypingState = useCallback(() => {
        setIsTyping(false);
        setTypingUser(null);
        if (typingResetTimeoutRef.current) {
            clearTimeout(typingResetTimeoutRef.current);
            typingResetTimeoutRef.current = null;
        }
    }, []);

    const scheduleTypingReset = useCallback(() => {
        if (typingResetTimeoutRef.current) {
            clearTimeout(typingResetTimeoutRef.current);
        }
        typingResetTimeoutRef.current = setTimeout(() => {
            clearTypingState();
        }, 2000);
    }, [clearTypingState]);

    // Send message
    const sendMessage = useCallback(
        async (input: SendMessageInput): Promise<boolean> => {
            const content = input.content?.trim() || '';
            const media = Array.isArray(input.media) ? input.media : [];
            const hasContent = Boolean(content);
            const hasMedia = media.length > 0;

            if ((!hasContent && !hasMedia) || !roomId || sending) {
                return false;
            }

            try {
                setSending(true);
                console.log('[CHAT_DEBUG] send-message:body', { roomId, content, media });
                if (!hasMedia && socketService.isConnected()) {
                    socketService.sendMessage({
                        chatRoomId: roomId,
                        content,
                    });
                } else {
                    await chatService.sendMessage(roomId, {
                        content,
                        media,
                    });
                }

                return true;
            } catch (error) {
                console.error('Failed to send message:', error);
                if (onError) {
                    onError(error as Error);
                }
                setMessages((prev) => prev.filter((msg) => !msg.id.startsWith('temp-')));
                return false;
            } finally {
                setSending(false);
                clearTypingState();
            }
        },
        [roomId, sending, onError, clearTypingState]
    );

    // Typing indicators
    const startTyping = useCallback(() => {
        if (socketService.isConnected() && roomId) {
            socketService.startTyping(roomId);
        }
    }, [roomId]);

    const stopTyping = useCallback(() => {
        if (socketService.isConnected() && roomId) {
            socketService.stopTyping(roomId);
        }
    }, [roomId]);

    // Setup Socket.IO connection and event listeners
    useEffect(() => {
        // Don't setup if no room ID
        if (!roomId) {
            return;
        }

        isMounted.current = true;
        let hasJoinedRoom = false;
        let handlers: any = null;

        const setupSocket = async () => {
            try {
                const socket = await socketService.connect();
                setConnected(true);

                // Join chat room only once
                if (!hasJoinedRoom) {
                    socketService.joinChat(roomId);
                    hasJoinedRoom = true;
                }

                // Listen for new messages
                const handleNewMessage = (data: any) => {
                    console.log('[CHAT_DEBUG] socket:new-message:body', data?.message || data);
                    const callBody = extractCallBody(data?.message || data);
                    if (callBody) {
                        console.log('[CHAT_DEBUG] socket:new-message:call-body', callBody);
                    }

                    if (data.message && data.message.chatRoomId === roomId) {
                        clearTypingState();
                        setMessages((prev) => {
                            // Remove temp message if exists
                            const filtered = prev.filter((msg) => !msg.id.startsWith('temp-'));
                            // Add new message if not already present
                            if (!filtered.some((msg) => msg.id === data.message.id)) {
                                return [data.message, ...filtered];
                            }
                            return filtered;
                        });
                    }
                };

                // Listen for typing indicators
                const handleUserTyping = (data: any) => {
                    const payload = data || {};
                    const typingUserId =
                        payload.userId ||
                        payload.senderId ||
                        payload.user?.id ||
                        payload.sender?.id;

                    // Ignore own typing events even if backend shape changes.
                    if (typingUserId && typingUserId === user?.id) {
                        return;
                    }

                    const eventRoomId = payload.chatRoomId || payload.roomId || payload.chatId;
                    if (!eventRoomId || eventRoomId !== roomId) {
                        return;
                    }

                    const isUserTyping = payload.isTyping !== false && payload.typing !== false;
                    if (isUserTyping) {
                        setIsTyping(true);
                        setTypingUser(
                            payload.userName ||
                            payload.name ||
                            payload.user?.name ||
                            payload.sender?.name ||
                            'Someone'
                        );
                        scheduleTypingReset();
                    } else {
                        clearTypingState();
                    }
                };

                // Listen for explicit stop-typing event when backend emits it.
                const handleTypingStop = (data: any) => {
                    const payload = data || {};
                    const eventRoomId = payload.chatRoomId || payload.roomId || payload.chatId;
                    if (!eventRoomId || eventRoomId !== roomId) {
                        return;
                    }

                    const typingUserId =
                        payload.userId ||
                        payload.senderId ||
                        payload.user?.id ||
                        payload.sender?.id;

                    if (typingUserId && typingUserId === user?.id) {
                        return;
                    }

                    clearTypingState();
                };

                const handleError = (error: any) => {
                    console.error('Socket error in chat:', error.message || error);
                    if (onError) {
                        onError(new Error(error.message || 'Socket error occurred'));
                    }
                };

                socketService.onNewMessage(handleNewMessage);
                socketService.onUserTyping(handleUserTyping);
                socket.on('typing_stop', handleTypingStop);
                socket.on('error', handleError);

                handlers = {
                    handleNewMessage,
                    handleUserTyping,
                    handleTypingStop,
                    handleError,
                };
            } catch (error) {
                console.error('Socket setup error:', error);
                setConnected(false);
            }
        };

        // Setup socket and load messages once
        setupSocket();
        loadMessages();

        return () => {
            isMounted.current = false;

            // Leave chat room only if we joined
            if (hasJoinedRoom) {
                socketService.leaveChat(roomId);
            }

            // Remove event listeners with specific handlers
            if (handlers) {
                socketService.offNewMessage(handlers.handleNewMessage);
                socketService.offUserTyping(handlers.handleUserTyping);
                socketService.getSocket()?.off('typing_stop', handlers.handleTypingStop);
                socketService.getSocket()?.off('error', handlers.handleError);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomId, user?.id, clearTypingState, scheduleTypingReset, extractCallBody]);

    useEffect(() => {
        return () => {
            if (typingResetTimeoutRef.current) {
                clearTimeout(typingResetTimeoutRef.current);
                typingResetTimeoutRef.current = null;
            }
        };
    }, []);

    return {
        messages,
        loading,
        sending,
        connected,
        isTyping,
        typingUser,
        sendMessage,
        startTyping,
        stopTyping,
        refreshMessages: loadMessages,
    };
};
