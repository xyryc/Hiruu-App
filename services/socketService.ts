import AsyncStorage from '@react-native-async-storage/async-storage';
import { io, Socket } from 'socket.io-client';

class SocketService {
    private socket: Socket | null = null;
    private callsSocket: Socket | null = null;
    private token: string | null = null;
    private isConnecting: boolean = false;
    private isCallsConnecting: boolean = false;

    async connect(): Promise<Socket> {
        // Return existing connection
        if (this.socket?.connected) {
            return this.socket;
        }

        // Prevent concurrent connection attempts
        if (this.isConnecting) {
            console.log('⏳ Connection already in progress, waiting...');
            // Wait for existing connection attempt
            return new Promise((resolve) => {
                const checkInterval = setInterval(() => {
                    if (!this.isConnecting && this.socket) {
                        clearInterval(checkInterval);
                        resolve(this.socket);
                    }
                }, 100);
            });
        }

        this.isConnecting = true;

        try {
            this.token = await AsyncStorage.getItem('auth_access_token');
            let baseURL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
            baseURL = baseURL.replace(/\/api\/v1\/?$/, '');

            console.log('🔌 Connecting to socket with auth');

            this.socket = io(`${baseURL}/chat`, {
                auth: { token: this.token },
                transports: ['websocket', 'polling'],
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                reconnectionAttempts: 5,
            });

            this.socket.on('connect', () => {
                console.log('✅ Socket connected');
                this.isConnecting = false;
            });

            this.socket.on('connect_error', (error) => {
                console.error('❌ Socket connection error:', error.message);
                this.isConnecting = false;
            });

            this.socket.on('error', (error) => {
                console.error('❌ Socket error:', error);
            });

            this.socket.on('disconnect', (reason) => {
                if (reason !== 'io client disconnect') {
                    console.log('� Socket disconnected:', reason);
                }
                this.isConnecting = false;
            });

            return this.socket;
        } catch (error) {
            console.error('❌ Failed to connect socket:', error);
            this.isConnecting = false;
            throw error;
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
        if (this.callsSocket) {
            this.callsSocket.disconnect();
            this.callsSocket = null;
        }
        this.token = null;
        this.isConnecting = false;
        this.isCallsConnecting = false;
    }

    getSocket(): Socket | null {
        return this.socket;
    }

    isConnected(): boolean {
        return this.socket?.connected || false;
    }

    async connectCalls(): Promise<Socket> {
        if (this.callsSocket?.connected) {
            console.log('[CALL_DEBUG] calls-socket:already-connected');
            return this.callsSocket;
        }

        if (this.isCallsConnecting) {
            return new Promise((resolve) => {
                const checkInterval = setInterval(() => {
                    if (!this.isCallsConnecting && this.callsSocket) {
                        clearInterval(checkInterval);
                        resolve(this.callsSocket);
                    }
                }, 100);
            });
        }

        this.isCallsConnecting = true;
        console.log('[CALL_DEBUG] calls-socket:connecting:start');

        try {
            this.token = this.token || await AsyncStorage.getItem('auth_access_token');
            let baseURL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
            baseURL = baseURL.replace(/\/api\/v1\/?$/, '');

            this.callsSocket = io(`${baseURL}/calls`, {
                auth: { token: this.token },
                transports: ['websocket', 'polling'],
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                reconnectionAttempts: 5,
            });

            this.callsSocket.on('connect', () => {
                console.log('[CALL_DEBUG] calls-socket:connected');
                this.isCallsConnecting = false;
            });

            this.callsSocket.on('connect_error', (error) => {
                console.log('[CALL_DEBUG] calls-socket:connect_error', error?.message || error);
                this.isCallsConnecting = false;
            });

            this.callsSocket.on('disconnect', (reason) => {
                console.log('[CALL_DEBUG] calls-socket:disconnect', reason);
                this.isCallsConnecting = false;
            });

            return this.callsSocket;
        } catch (error) {
            console.log('[CALL_DEBUG] calls-socket:connecting:exception', error);
            this.isCallsConnecting = false;
            throw error;
        }
    }

    joinChat(chatRoomId: string) {
        if (!this.socket?.connected) return;
        this.socket.emit('join_chat', { chatRoomId });
    }

    leaveChat(chatRoomId: string) {
        if (!this.socket?.connected) return;
        this.socket.emit('leave_chat', { chatRoomId });
    }

    sendMessage(data: { chatRoomId: string; content: string }) {
        if (!this.socket?.connected) {
            console.error('❌ Socket not connected');
            return;
        }

        const payload = {
            chatRoomId: data.chatRoomId,
            content: data.content,
        };

        console.log('📤 Sending message:', payload);

        this.socket.emit('send_message', payload);
    }

    startTyping(chatRoomId: string) {
        if (!this.socket?.connected) return;
        this.socket.emit('typing_start', { chatRoomId });
    }

    stopTyping(chatRoomId: string) {
        if (!this.socket?.connected) return;
        this.socket.emit('typing_stop', { chatRoomId });
    }

    onNewMessage(callback: (data: any) => void) {
        this.socket?.on('new_message', callback);
    }

    onUserTyping(callback: (data: any) => void) {
        this.socket?.on('user_typing', callback);
    }

    offNewMessage(callback?: (data: any) => void) {
        this.socket?.off('new_message', callback);
    }

    offUserTyping(callback?: (data: any) => void) {
        this.socket?.off('user_typing', callback);
    }

    getCallsSocket(): Socket | null {
        return this.callsSocket;
    }

    onIncomingCall(callback: (data: any) => void) {
        this.callsSocket?.on('incoming_call', callback);
    }

    offIncomingCall(callback?: (data: any) => void) {
        this.callsSocket?.off('incoming_call', callback);
    }

    onCallEnded(callback: (data: any) => void) {
        this.callsSocket?.on('call_ended', callback);
    }

    offCallEnded(callback?: (data: any) => void) {
        this.callsSocket?.off('call_ended', callback);
    }

    joinCall(callId: string) {
        if (!this.callsSocket?.connected) return;
        console.log('[CALL_DEBUG] emit:join_call', { callId });
        this.callsSocket.emit('join_call', { callId });
    }

    leaveCall(callId: string) {
        if (!this.callsSocket?.connected) return;
        console.log('[CALL_DEBUG] emit:leave_call', { callId });
        this.callsSocket.emit('leave_call', { callId });
    }

    changeCallStatus(callId: string, status: string, reason?: string) {
        if (!this.callsSocket?.connected) return;
        console.log('[CALL_DEBUG] emit:call_status_changed', { callId, status, reason });
        this.callsSocket.emit('call_status_changed', { callId, status, reason });
    }

    changeMediaState(callId: string, isMicMuted: boolean, isCameraOff = true, isSharingScreen = false) {
        if (!this.callsSocket?.connected) return;
        console.log('[CALL_DEBUG] emit:media_state_changed', {
            callId,
            isMicMuted,
            isCameraOff,
            isSharingScreen,
        });
        this.callsSocket.emit('media_state_changed', {
            callId,
            isMicMuted,
            isCameraOff,
            isSharingScreen,
        });
    }

    onCallParticipants(callback: (data: any) => void) {
        this.callsSocket?.on('call_participants', callback);
    }

    offCallParticipants(callback?: (data: any) => void) {
        this.callsSocket?.off('call_participants', callback);
    }

    onParticipantJoined(callback: (data: any) => void) {
        this.callsSocket?.on('participant_joined', callback);
    }

    offParticipantJoined(callback?: (data: any) => void) {
        this.callsSocket?.off('participant_joined', callback);
    }

    onParticipantLeft(callback: (data: any) => void) {
        this.callsSocket?.on('participant_left', callback);
    }

    offParticipantLeft(callback?: (data: any) => void) {
        this.callsSocket?.off('participant_left', callback);
    }

    onParticipantDisconnected(callback: (data: any) => void) {
        this.callsSocket?.on('participant_disconnected', callback);
    }

    offParticipantDisconnected(callback?: (data: any) => void) {
        this.callsSocket?.off('participant_disconnected', callback);
    }

    onParticipantStatusChanged(callback: (data: any) => void) {
        this.callsSocket?.on('participant_status_changed', callback);
    }

    offParticipantStatusChanged(callback?: (data: any) => void) {
        this.callsSocket?.off('participant_status_changed', callback);
    }

    sendOffer(callId: string, targetUserId: string, offer: any) {
        if (!this.callsSocket?.connected) return;
        this.callsSocket.emit('offer', { callId, targetUserId, offer });
    }

    sendAnswer(callId: string, targetUserId: string, answer: any) {
        if (!this.callsSocket?.connected) return;
        this.callsSocket.emit('answer', { callId, targetUserId, answer });
    }

    sendIceCandidate(callId: string, targetUserId: string, candidate: any) {
        if (!this.callsSocket?.connected) return;
        this.callsSocket.emit('ice_candidate', { callId, targetUserId, candidate });
    }

    onOffer(callback: (data: any) => void) {
        this.callsSocket?.on('offer', callback);
    }

    offOffer(callback?: (data: any) => void) {
        this.callsSocket?.off('offer', callback);
    }

    onAnswer(callback: (data: any) => void) {
        this.callsSocket?.on('answer', callback);
    }

    offAnswer(callback?: (data: any) => void) {
        this.callsSocket?.off('answer', callback);
    }

    onIceCandidate(callback: (data: any) => void) {
        this.callsSocket?.on('ice_candidate', callback);
    }

    offIceCandidate(callback?: (data: any) => void) {
        this.callsSocket?.off('ice_candidate', callback);
    }
}

export const socketService = new SocketService();
