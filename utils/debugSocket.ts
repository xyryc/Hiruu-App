/**
 * Socket.IO Debug Utility
 *
 * Use this to debug Socket.IO connection issues
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export const debugSocketConnection = async () => {
    console.log('\n=== SOCKET.IO DEBUG INFO ===\n');

    // Check environment
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    console.log('1. Environment:');
    console.log('   API URL:', apiUrl || 'NOT SET');
    console.log('   Platform:', process.env.EXPO_PUBLIC_PLATFORM);
    console.log('');

    // Check token
    const token = await AsyncStorage.getItem('auth_access_token');
    console.log('2. Authentication:');
    console.log('   Token present:', !!token);
    console.log('   Token length:', token?.length || 0);
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            console.log('   Token expires:', new Date(payload.exp * 1000).toISOString());
            console.log('   Token expired:', Date.now() > payload.exp * 1000);
        } catch (e) {
            console.log('   Token format: Invalid JWT');
        }
    }
    console.log('');

    // Check URL format
    if (apiUrl) {
        const baseURL = apiUrl.replace(/\/api\/v1\/?$/, '');
        console.log('3. Connection URLs:');
        console.log('   Base URL:', baseURL);
        console.log('   Socket URL:', `${baseURL}/chat`);
        console.log('   REST API:', apiUrl);
        console.log('');

        // Test reachability
        console.log('4. Testing connectivity...');
        try {
            const response = await fetch(baseURL, { method: 'HEAD' });
            console.log('   Backend reachable:', response.ok);
            console.log('   Status:', response.status);
        } catch (error: any) {
            console.log('   Backend reachable: NO');
            console.log('   Error:', error.message);
        }
    }

    console.log('\n=== END DEBUG INFO ===\n');
};

/**
 * Test Socket.IO connection without namespace
 */
export const testSocketConnection = async () => {
    const { io } = require('socket.io-client');
    const token = await AsyncStorage.getItem('auth_access_token');
    const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
    const baseURL = apiUrl.replace(/\/api\/v1\/?$/, '');

    console.log('\n=== TESTING SOCKET CONNECTION ===\n');
    console.log('Connecting to:', baseURL);

    const socket = io(baseURL, {
        auth: { token },
        transports: ['websocket', 'polling'],
        timeout: 5000,
    });

    socket.on('connect', () => {
        console.log('✅ Connected to root namespace!');
        console.log('   Socket ID:', socket.id);
        console.log('   Namespace:', socket.nsp);
        socket.disconnect();
    });

    socket.on('connect_error', (error: any) => {
        console.log('❌ Connection failed:', error.message);
        console.log('   Error type:', error.type);
        console.log('   Description:', error.description);
    });

    // Auto-disconnect after 10 seconds
    setTimeout(() => {
        if (socket.connected) {
            console.log('Disconnecting...');
            socket.disconnect();
        }
        console.log('\n=== TEST COMPLETE ===\n');
    }, 10000);
};

/**
 * Test Socket.IO connection with /chat namespace
 */
export const testChatNamespace = async () => {
    const { io } = require('socket.io-client');
    const token = await AsyncStorage.getItem('auth_access_token');
    const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
    const baseURL = apiUrl.replace(/\/api\/v1\/?$/, '');

    console.log('\n=== TESTING /chat NAMESPACE ===\n');
    console.log('Connecting to:', `${baseURL}/chat`);

    const socket = io(`${baseURL}/chat`, {
        auth: { token },
        transports: ['websocket', 'polling'],
        timeout: 5000,
    });

    socket.on('connect', () => {
        console.log('✅ Connected to /chat namespace!');
        console.log('   Socket ID:', socket.id);
        console.log('   Namespace:', socket.nsp);
        socket.disconnect();
    });

    socket.on('connect_error', (error: any) => {
        console.log('❌ Connection failed:', error.message);
        console.log('   Error type:', error.type);
        console.log('   Description:', error.description);

        if (error.message.includes('Invalid namespace')) {
            console.log('\n💡 Solution: Your backend needs to configure the /chat namespace');
            console.log('   See CHAT_TROUBLESHOOTING.md for details');
        }
    });

    // Auto-disconnect after 10 seconds
    setTimeout(() => {
        if (socket.connected) {
            console.log('Disconnecting...');
            socket.disconnect();
        }
        console.log('\n=== TEST COMPLETE ===\n');
    }, 10000);
};
