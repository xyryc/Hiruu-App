import AsyncStorage from '@react-native-async-storage/async-storage';
import { io, Socket } from 'socket.io-client';

class SocketService {
    private socket: Socket | null = null;
    private token: string | null = null;
    private isConnecting: boolean = false;

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
                console.log('❌ Socket connection error:', error.message);
                this.isConnecting = false;
            });

            this.socket.on('error', (error) => {
                console.log('❌ Socket error:', error);
            });

            this.socket.on('disconnect', (reason) => {
                if (reason !== 'io client disconnect') {
                    console.log('� Socket disconnected:', reason);
                }
                this.isConnecting = false;
            });

            return this.socket;
        } catch (error) {
            console.log('❌ Failed to connect socket:', error);
            this.isConnecting = false;
            throw error;
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.token = null;
            this.isConnecting = false;
        }
    }

    getSocket(): Socket | null {
        return this.socket;
    }

    isConnected(): boolean {
        return this.socket?.connected || false;
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
            console.log('❌ Socket not connected');
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
}

export const socketService = new SocketService();
