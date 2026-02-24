# Frontend Implementation Plan (Codex-Ready)

This plan is designed so Codex can implement React Native chat + calls with minimal ambiguity.

## 1) Scope

Build React Native features for:
- Auth token wiring to REST and sockets
- Chat list and chat room messaging
- Typing/read receipts/presence
- 1:1 and group calling
- Agora media join and in-call controls

Out of scope:
- Push notifications backend integration
- Advanced moderation/admin tooling

## 2) Required Backend Contracts

Source of truth:
- `docs/API_OVERVIEW.md`
- `docs/REALTIME_EVENTS.md`
- `docs/REACT_NATIVE_CALLS_INTEGRATION.md`

Key constraints:
- Calls media is Agora (`POST /calls/:id/media/session`)
- No `offer/answer/ice_candidate` socket handlers in current backend

## 3) Frontend Architecture

Use:
- `axios` for REST
- `socket.io-client` for realtime
- `react-native-agora` for media
- Global state (Redux Toolkit or Zustand)

Suggested folders:
- `src/api/` (`client.ts`, `auth.ts`, `chat.ts`, `calls.ts`)
- `src/socket/` (`chatSocket.ts`, `callsSocket.ts`)
- `src/features/chat/` (`screens`, `components`, `store`)
- `src/features/calls/` (`screens`, `components`, `store`, `agora`)
- `src/navigation/`

## 4) Implementation Phases

## Phase A: Foundation

Tasks:
- Create typed API client with JWT interceptor
- Create chat and calls socket clients with `auth.token`
- Add reconnect behavior and connection status state

Done when:
- App can call protected endpoint with Bearer token
- Both sockets connect and reconnect successfully

## Phase B: Messaging

Tasks:
- Chat room list screen (`GET /chat/rooms`)
- Chat room detail screen with paginated messages (`GET /chat/rooms/:id/messages`)
- Send message (REST + socket `new_message` updates)
- Typing indicator (`typing_start`, `typing_stop`, `user_typing`)
- Mark read (`PATCH /chat/messages/:id/read`, `PATCH /chat/rooms/:id/read`, `mark_as_read`)

Done when:
- Two users can exchange realtime messages in same room
- Typing/read updates appear on both sides

## Phase C: Call Setup

Tasks:
- Start call (`POST /calls/rooms/:chatRoomId/initiate`)
- Join call (`POST /calls/:id/join`)
- Emit `join_call`
- Render participants from `call_participants` and join/leave events

Done when:
- Caller and callee can enter same call room and see participant changes

## Phase D: Agora Media

Tasks:
- Request Agora token (`POST /calls/:id/media/session`)
- Join Agora channel with returned `appId`, `channelName`, `userAccount`, `rtcToken`
- Publish local audio/video
- Subscribe/render remote streams

Done when:
- 1:1 and group calls have working audio/video

## Phase E: In-Call Controls + Sync

Tasks:
- Mic/camera toggle in UI
- Emit `media_state_changed`
- Persist state via `PATCH /calls/:id/media`
- Leave flow: `leave_call` + `PATCH /calls/:id/status` (`left`) or `POST /calls/:id/end`

Done when:
- Media state updates are reflected to participants (`participant_media_changed`)
- Leaving user is reflected via participant events

## Phase F: Resilience

Tasks:
- Rejoin logic on socket reconnect (`join_call`)
- Active call recovery on app resume (`GET /calls/rooms/:chatRoomId/active`)
- Basic retry and error UI for network failures

Done when:
- App recovers gracefully from foreground/background and brief disconnects

## 5) Acceptance Test Checklist

- Messaging:
  - User A sends message, User B receives via realtime
  - Typing indicator appears/disappears correctly
  - Read state sync works
- Calls:
  - Call initiation from chat room works
  - Callee can join ongoing call
  - Agora media session returns valid token data
  - Audio/video works both directions
  - Group call adds/removes participants correctly
  - Mute/camera state sync events are visible to others
  - Disconnect/reconnect rejoins call room correctly

## 6) Codex Prompt (Copy/Paste)

Use this prompt in your frontend repo:

```text
Implement chat + calling in this React Native app using the backend contracts below.

Backend contracts:
- docs/API_OVERVIEW.md
- docs/REALTIME_EVENTS.md
- docs/REACT_NATIVE_CALLS_INTEGRATION.md

Requirements:
1) Build axios API layer with JWT auth interceptor.
2) Build socket clients for /chat and /calls with auth.token and reconnect handling.
3) Implement chat room list, message list, send message, typing, and read receipts.
4) Implement call flow: initiate -> join -> socket join_call -> media session -> Agora channel join.
5) Implement in-call UI controls: mute, camera toggle, leave/end with backend sync.
6) Implement recovery logic on reconnect and app resume (active call check).
7) Add minimal but complete UI screens and state management.
8) Add clear error handling and loading states.
9) Do not implement offer/answer/ice_candidate signaling (backend does not support these handlers).

Deliverables:
- File-by-file changes
- Setup/env instructions
- Manual test steps
- Known limitations
```
