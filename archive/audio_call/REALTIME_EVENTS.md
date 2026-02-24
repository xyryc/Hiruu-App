# Realtime Events

Namespaces:
- `/chat`
- `/calls`

Auth:
- Pass JWT token in socket handshake:

```ts
io(`${SOCKET_BASE_URL}/chat`, {
  transports: ['websocket'],
  auth: { token: accessToken },
});
```

## Chat Namespace (`/chat`)

Client -> Server:
- `send_message` `{ chatRoomId, content, type?, replyToId?, mentions? }`
- `typing_start` `{ chatRoomId }`
- `typing_stop` `{ chatRoomId }`
- `mark_as_read` `{ chatRoomId, messageId? }`
- `join_chat` `{ chatRoomId }`
- `leave_chat` `{ chatRoomId }`

Server -> Client:
- `new_message` `{ chatRoomId, message }`
- `user_typing` `{ userId, userName, chatRoomId, isTyping }`
- `message_read` `{ userId, userName, chatRoomId, messageId? }`
- `joined_chat` `{ chatRoomId }`
- `left_chat` `{ chatRoomId }`
- `user_online` `{ userId, name, avatar }`
- `user_offline` `{ userId }`
- `error` `{ message }`

Notes:
- On connection, backend auto-joins the user to active chat rooms.
- Backend toggles user online/offline status on connect/disconnect.

## Calls Namespace (`/calls`)

Client -> Server:
- `join_call` `{ callId }`
- `leave_call` `{ callId }`
- `media_state_changed` `{ callId, isMicMuted?, isCameraOff?, isSharingScreen? }`
- `call_status_changed` `{ callId, status, reason? }`

Server -> Client:
- `call_participants` `{ callId, participants[] }`
- `participant_joined` `{ userId, userName, avatar }`
- `participant_left` `{ userId, userName }`
- `participant_disconnected` `{ userId, userName }`
- `participant_media_changed` `{ callId, userId, userName, isMicMuted?, isCameraOff?, isSharingScreen? }`
- `participant_status_changed` `{ userId, userName, status, reason? }`
- `incoming_call` `{ callId, ... }` (when emitted by backend flow)
- `call_ended` `{ callId, reason, endedAt }` (when emitted by backend flow)
- `error` `{ message }`

Important:
- Current `/calls` gateway does not handle `offer`, `answer`, or `ice_candidate` events.
- Media transport is handled through Agora session credentials from REST.
