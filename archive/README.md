# Audio/Video Calls System

This module implements audio and video calling functionality with WebRTC signaling.

## Features

### Call Types
- **Audio Calls**: Voice-only communication
- **Video Calls**: Audio + video communication
- **Group Calls**: Multiple participants (up to 50)
- **Direct Calls**: 1-on-1 conversations

### Call Management
- **Call Initiation**: Start calls in chat rooms
- **Call Joining**: Join ongoing calls
- **Call Status Tracking**: Monitor participant status
- **Call History**: Track completed calls
- **Call Recording**: Optional call recording (configurable)

### Media Controls
- **Microphone Control**: Mute/unmute audio
- **Camera Control**: Turn video on/off
- **Screen Sharing**: Share screen with participants
- **Media State Sync**: Real-time media state updates

## API Endpoints

### Call Management
- `POST /api/v1/calls/rooms/:chatRoomId/initiate` - Start a call
- `POST /api/v1/calls/:id/join` - Join a call
- `POST /api/v1/calls/:id/end` - End a call
- `PATCH /api/v1/calls/:id/status` - Update participant status
- `PATCH /api/v1/calls/:id/media` - Update media state

### Call Queries
- `GET /api/v1/calls/:id` - Get call details
- `GET /api/v1/calls` - Get call history
- `GET /api/v1/calls/rooms/:chatRoomId/active` - Get active call in room

## WebSocket Events (Calls Namespace)

### Connection
- Connect to `/calls` namespace with JWT token
- Automatic call room management

### WebRTC Signaling
- `offer` - WebRTC offer exchange
- `answer` - WebRTC answer exchange
- `ice_candidate` - ICE candidate exchange

### Call Events
- `join_call` - Join call room
- `leave_call` - Leave call room
- `media_state_changed` - Update media state
- `call_status_changed` - Update call status

### Server Events
- `participant_joined` - New participant joined
- `participant_left` - Participant left
- `participant_media_changed` - Media state changed
- `incoming_call` - Incoming call notification
- `call_ended` - Call ended notification

## Call Flow

### 1. Initiating a Call
```typescript
// Start a video call
const call = await callsService.initiateCall(chatRoomId, userId, {
  type: 'video',
  isGroupCall: false,
  inviteUserIds: ['user-id']
});
```

### 2. WebRTC Signaling
```javascript
// Client-side WebRTC setup
socket.on('offer', async ({ offer, fromUserId }) => {
  await peerConnection.setRemoteDescription(offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  
  socket.emit('answer', {
    callId: currentCallId,
    targetUserId: fromUserId,
    answer: answer
  });
});
```

### 3. Media Control
```javascript
// Mute microphone
socket.emit('media_state_changed', {
  callId: currentCallId,
  isMicMuted: true
});
```

## Call States

### Call Status
- `initiated` - Call created, waiting for participants
- `ringing` - Participants being notified
- `ongoing` - Call in progress
- `completed` - Call ended successfully
- `missed` - Call not answered
- `rejected` - Call declined
- `cancelled` - Call cancelled by initiator
- `failed` - Call failed due to technical issues

### Participant Status
- `invited` - Invited to call
- `ringing` - Being notified
- `joined` - Active in call
- `left` - Left the call
- `declined` - Declined the call
- `missed` - Didn't respond

## WebRTC Integration

The system provides signaling for WebRTC connections but doesn't handle the actual media streams. Clients need to:

1. **Establish WebRTC Connection**: Use the signaling events to exchange offers/answers
2. **Handle ICE Candidates**: Exchange network information
3. **Manage Media Streams**: Handle local/remote video/audio streams
4. **Implement UI Controls**: Mute, camera toggle, screen share buttons

## Database Schema

The calls system uses:
- `Call` - Call information and metadata
- `CallParticipant` - Participant status and media state
- `ChatMessage` - Call log messages in chat

## Security & Performance

- JWT authentication for all call operations
- Participant verification before joining calls
- Automatic call cleanup when all participants leave
- Call duration tracking and limits
- Media state synchronization across participants