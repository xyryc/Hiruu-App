# React Native Calls Integration (Agora)

This guide reflects the current backend behavior: call media is Agora-based.

It covers:
- REST payloads
- Socket payloads (`/calls` namespace)
- Agora join flow for 1:1 and group calls

## 1) Required Backend Env

```env
AGORA_APP_ID=your-agora-app-id
AGORA_APP_CERTIFICATE=your-agora-app-certificate
AGORA_TOKEN_TTL_SECONDS=3600
```

`POST /api/v1/calls/:id/media/session` returns Agora credentials.

## 2) Auth

- REST: `Authorization: Bearer <accessToken>`
- Socket: JWT in handshake auth

```ts
io(`${SOCKET_BASE_URL}/calls`, {
  auth: { token: accessToken },
  transports: ['websocket'],
});
```

## 3) REST Endpoints

## 3.1 Initiate Call

`POST /api/v1/calls/rooms/:chatRoomId/initiate`

```json
{
  "type": "video",
  "isGroupCall": true,
  "inviteUserIds": ["user-id-1", "user-id-2"]
}
```

`maxParticipants` is optional. In most business/group calls, you can omit it and rely on the room member scope you invite.

## 3.2 Join Call

`POST /api/v1/calls/:id/join`

```json
{
  "isMicMuted": false,
  "isCameraOff": false
}
```

## 3.3 Create Media Session (Agora)

`POST /api/v1/calls/:id/media/session`

Example response:

```json
{
  "statusCode": 200,
  "message": "Media session created successfully",
  "data": {
    "provider": "agora",
    "mode": "sfu",
    "channelName": "call_<callId>",
    "userAccount": "<userId>",
    "appId": "<agora-app-id>",
    "rtcToken": "<agora-rtc-token>",
    "expiresAt": "2026-02-24T12:00:00.000Z"
  }
}
```

## 3.4 Update Participant Status

`PATCH /api/v1/calls/:id/status`

```json
{
  "status": "left",
  "declineReason": "busy"
}
```

Allowed values:
- `invited`
- `ringing`
- `joined`
- `left`
- `declined`
- `missed`

## 3.5 Update Media State

`PATCH /api/v1/calls/:id/media`

```json
{
  "isMicMuted": true,
  "isCameraOff": false,
  "isSharingScreen": false
}
```

## 3.6 End Call

`POST /api/v1/calls/:id/end`

## 4) Socket Events (`/calls`)

## 4.1 Client -> Server

- `join_call` `{ callId }`
- `leave_call` `{ callId }`
- `media_state_changed` `{ callId, isMicMuted?, isCameraOff?, isSharingScreen? }`
- `call_status_changed` `{ callId, status, reason? }`

## 4.2 Server -> Client

- `call_participants`
- `participant_joined`
- `participant_left`
- `participant_disconnected`
- `participant_media_changed`
- `participant_status_changed`
- `incoming_call` (when emitted by backend flow)
- `call_ended` (when emitted by backend flow)
- `error`

## 5) Recommended React Native Flow (Agora)

1. Initiate call: `POST /calls/rooms/:chatRoomId/initiate`
2. Connect socket `/calls` for all participants
3. Join call via REST: `POST /calls/:id/join`
4. Emit socket `join_call`
5. Get Agora token: `POST /calls/:id/media/session`
6. Join Agora channel with `appId + channelName + userAccount + rtcToken`
7. Sync toggles with `media_state_changed` and `PATCH /calls/:id/media`
8. Leave/end with `leave_call` and `POST /calls/:id/end` (or `PATCH /calls/:id/status`)

## 6) Notes

- Group calling should use Agora media session flow.
- Reconnect handling: after socket reconnect, emit `join_call` again.
- Active call recovery: `GET /api/v1/calls/rooms/:chatRoomId/active`
- Swagger: `http://<HOST>:<PORT>/api/docs`
