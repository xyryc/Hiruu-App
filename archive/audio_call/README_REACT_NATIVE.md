# React Native Integration (Messaging + Calls)

This guide covers React Native integration with this backend.

- Messaging: direct + group chat
- Calling: direct + group calling
- Media session: Agora

## 1) Install

```bash
npm i axios socket.io-client
npm i react-native-agora
```

## 2) Client Env

```env
API_BASE_URL=http://localhost:3000/api/v1
SOCKET_BASE_URL=http://localhost:3000
```

## 3) HTTP Client

```ts
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_BASE_URL,
});

export const setToken = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};
```

## 4) Socket Setup

```ts
import { io } from 'socket.io-client';

export const chatSocket = (token: string) =>
  io(`${process.env.SOCKET_BASE_URL}/chat`, {
    transports: ['websocket'],
    auth: { token },
  });

export const callsSocket = (token: string) =>
  io(`${process.env.SOCKET_BASE_URL}/calls`, {
    transports: ['websocket'],
    auth: { token },
  });
```

## 5) Messaging Flow

1. Create or fetch room (`/chat/rooms`).
2. Connect `/chat` socket.
3. Send message via REST or socket `send_message`.
4. Listen for `new_message`.
5. Emit `typing_start`/`typing_stop` for typing UI.
6. Emit `mark_as_read` and listen for `message_read`.

## 6) Calling Flow (Agora)

1. Start call: `POST /calls/rooms/:chatRoomId/initiate`
2. Join call: `POST /calls/:id/join`
3. Connect `/calls` socket and emit `join_call`
4. Request media session: `POST /calls/:id/media/session`
5. Join Agora channel using returned:
- `appId`
- `channelName`
- `userAccount`
- `rtcToken`
6. Sync mute/camera/screen state:
- socket `media_state_changed`
- REST `PATCH /calls/:id/media`
7. Leave/end:
- socket `leave_call`
- REST `PATCH /calls/:id/status` or `POST /calls/:id/end`

## 7) Event Contracts

Use [REALTIME_EVENTS.md](REALTIME_EVENTS.md) as the source of truth.

## 8) Notes

- Use the same JWT for REST and sockets.
- Calls are Agora media sessions.
- Do not implement `offer/answer/ice_candidate` with current backend gateway.
- For precise field schemas, use Swagger: `http://localhost:3000/api/docs`
