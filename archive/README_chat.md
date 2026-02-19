# Enhanced Messaging System

This module implements a comprehensive messaging system with real-time capabilities.

## Features

### Chat Rooms
- **Direct Messages**: 1-on-1 conversations between users
- **Business Groups**: Team communication within businesses
- **Support Chat**: User-to-platform support conversations

### Messaging
- **Text Messages**: Standard text communication
- **Media Sharing**: Images, videos, audio files, documents
- **Message Replies**: Thread-like conversations
- **Message Mentions**: @mention other users
- **Read Receipts**: Track message delivery and read status
- **Message Search**: Find messages by content, type, sender, date

### Real-time Features
- **WebSocket Integration**: Live message delivery
- **Typing Indicators**: See when users are typing
- **Online Status**: Track user presence
- **Push Notifications**: Offline message notifications

## API Endpoints

### Chat Rooms
- `POST /api/v1/chat/rooms` - Create chat room
- `GET /api/v1/chat/rooms` - Get user's chat rooms
- `GET /api/v1/chat/rooms/:id` - Get chat room details
- `POST /api/v1/chat/rooms/:id/participants` - Add participant
- `PATCH /api/v1/chat/rooms/:id/participants/:userId/remove` - Remove participant

### Messages
- `POST /api/v1/chat/rooms/:id/messages` - Send message (with media upload)
- `GET /api/v1/chat/rooms/:id/messages` - Get messages with pagination
- `PATCH /api/v1/chat/messages/:id/read` - Mark message as read
- `PATCH /api/v1/chat/rooms/:id/read` - Mark all messages as read

## WebSocket Events

### Connection
- Connect to `/chat` and `/calls` namespaces with JWT token
- Automatic chat room joining is done on `/chat` connection based on user's chat rooms

```javascript
// Chat namespace
const chatSocket = io('http://localhost:3000/chat', {
  auth: { token: '<JWT_TOKEN>' }
});

// Calls namespace
const callsSocket = io('http://localhost:3000/calls', {
  auth: { token: '<JWT_TOKEN>' }
});
```

### Chat Namespace (`/chat`)

#### Client -> Server
- `send_message`
```json
{
  "chatRoomId": "room-uuid",
  "content": "Hello team",
  "type": "text",
  "replyToId": "message-uuid",
  "mentions": ["user-uuid-1", "user-uuid-2"]
}
```
- `typing_start`
```json
{
  "chatRoomId": "room-uuid"
}
```
- `typing_stop`
```json
{
  "chatRoomId": "room-uuid"
}
```
- `mark_as_read`
```json
{
  "chatRoomId": "room-uuid",
  "messageId": "message-uuid"
}
```
- `join_chat`
```json
{
  "chatRoomId": "room-uuid"
}
```
- `leave_chat`
```json
{
  "chatRoomId": "room-uuid"
}
```

#### Server -> Client
- `new_message`
```json
{
  "chatRoomId": "room-uuid",
  "message": {}
}
```
- `user_typing`
```json
{
  "userId": "user-uuid",
  "userName": "John",
  "chatRoomId": "room-uuid",
  "isTyping": true
}
```
- `message_read`
```json
{
  "userId": "user-uuid",
  "userName": "John",
  "chatRoomId": "room-uuid",
  "messageId": "message-uuid"
}
```
- `joined_chat`
```json
{
  "chatRoomId": "room-uuid"
}
```
- `left_chat`
```json
{
  "chatRoomId": "room-uuid"
}
```
- `user_online`
```json
{
  "userId": "user-uuid",
  "name": "John",
  "avatar": "https://..."
}
```
- `user_offline`
```json
{
  "userId": "user-uuid"
}
```
- `error`
```json
{
  "message": "Error details"
}
```

### Calls Namespace (`/calls`)

#### Client -> Server
- `join_call`
```json
{
  "callId": "call-uuid"
}
```
- `leave_call`
```json
{
  "callId": "call-uuid"
}
```
- `offer`
```json
{
  "callId": "call-uuid",
  "targetUserId": "user-uuid",
  "offer": {}
}
```
- `answer`
```json
{
  "callId": "call-uuid",
  "targetUserId": "user-uuid",
  "answer": {}
}
```
- `ice_candidate`
```json
{
  "callId": "call-uuid",
  "targetUserId": "user-uuid",
  "candidate": {}
}
```
- `media_state_changed`
```json
{
  "callId": "call-uuid",
  "isMicMuted": true,
  "isCameraOff": false,
  "isSharingScreen": false
}
```
- `call_status_changed`
```json
{
  "callId": "call-uuid",
  "status": "left",
  "reason": "Busy"
}
```

#### Server -> Client
- `call_participants`
```json
{
  "callId": "call-uuid",
  "participants": [
    {
      "userId": "user-uuid",
      "userName": "John",
      "avatar": "https://...",
      "status": "joined",
      "isMicMuted": false,
      "isCameraOff": false,
      "isSharingScreen": false
    }
  ]
}
```
- `participant_joined`
```json
{
  "userId": "user-uuid",
  "userName": "John",
  "avatar": "https://..."
}
```
- `participant_left`
```json
{
  "userId": "user-uuid",
  "userName": "John"
}
```
- `participant_disconnected`
```json
{
  "userId": "user-uuid",
  "userName": "John"
}
```
- `participant_media_changed`
```json
{
  "userId": "user-uuid",
  "userName": "John",
  "isMicMuted": true,
  "isCameraOff": false,
  "isSharingScreen": false
}
```
- `participant_status_changed`
```json
{
  "userId": "user-uuid",
  "userName": "John",
  "status": "left",
  "reason": "Busy"
}
```
- `incoming_call`
```json
{
  "callId": "call-uuid"
}
```
- `call_ended`
```json
{
  "callId": "call-uuid",
  "reason": "completed",
  "endedAt": "2026-02-19T10:00:00.000Z"
}
```
- `offer`
```json
{
  "callId": "call-uuid",
  "fromUserId": "user-uuid",
  "fromUserName": "John",
  "offer": {}
}
```
- `answer`
```json
{
  "callId": "call-uuid",
  "fromUserId": "user-uuid",
  "fromUserName": "John",
  "answer": {}
}
```
- `ice_candidate`
```json
{
  "callId": "call-uuid",
  "fromUserId": "user-uuid",
  "candidate": {}
}
```
- `error`
```json
{
  "message": "Error details"
}
```

## Usage Examples

### Creating a Direct Message
```typescript
const directChat = await chatService.createChatRoom(userId, {
  type: 'direct',
  participantIds: ['other-user-id']
});
```

### Sending a Message with Media
```typescript
// Via API with file upload
POST /api/v1/chat/rooms/{chatRoomId}/messages
Content-Type: multipart/form-data

{
  content: "Check out this image!",
  media: [file1, file2]
}
```

### WebSocket Message Sending
```javascript
socket.emit('send_message', {
  chatRoomId: 'room-id',
  content: 'Hello team!',
  mentions: ['user-id-1', 'user-id-2']
});
```

## Database Schema

The messaging system uses the following Prisma models:
- `ChatRoom` - Chat room information
- `ChatParticipant` - User participation in rooms
- `ChatMessage` - Individual messages
- `MessageReadReceipt` - Read status tracking

## Security

- JWT authentication required for all endpoints
- Users can only access rooms they participate in
- File uploads are validated and processed through Cloudinary
- Message content is sanitized and validated
