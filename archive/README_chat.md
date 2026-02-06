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
- Connect to `/chat` namespace with JWT token
- Automatic room joining based on user's chat rooms

### Client Events
- `send_message` - Send a new message
- `typing_start` - Start typing indicator
- `typing_stop` - Stop typing indicator
- `mark_as_read` - Mark messages as read
- `join_chat` - Join specific chat room
- `leave_chat` - Leave specific chat room

### Server Events
- `new_message` - New message received
- `user_typing` - User typing status
- `message_read` - Message read receipt
- `user_online` - User came online
- `user_offline` - User went offline

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