# API Overview

Base URL:
- `http://<host>:<port>/api/v1`

Auth:
- Bearer JWT for protected endpoints
- Swagger auth name: `JWT-auth`

## Core Route Groups

- `/auth` - registration, login, token refresh, account verification, password reset, OAuth linking
- `/users` - profile, preferences, onboarding, user lookup/list
- `/business` - create/update business, stats
- `/businesses/:businessId/roles` and `/permissions` - business role and permission management
- `/employment` - join, invitations, employee lifecycle
- `/recruitment` and `/recruitment-application` - job posting and applications
- `/shift-template`, `/shift-assignment`, `/shift-requests`, `/weekly-schedule` - scheduling and shift operations
- `/attendance` - clock-in/out and attendance approval
- `/leave` - leave credits and usage
- `/holidays` - business holiday calendar
- `/experiences`, `/companies`, `/job-profile` - profile and work history
- `/businesses/:businessId/ratings` - ratings and rankings
- `/wallet`, `/coin-transactions`, `/cosmetics`, `/achievements`, `/referrals` - gamification/economy
- `/plans`, `/subscriptions`, `/subscriptions/webhooks/stripe` - plans and billing
- `/chat` - chat rooms, messages, participants, read receipts
- `/calls` - call lifecycle and media sessions (Agora token issuance)

## Key Messaging and Calls Endpoints

Chat:
- `POST /chat/rooms`
- `GET /chat/rooms`
- `GET /chat/rooms/:id`
- `POST /chat/rooms/:id/messages`
- `GET /chat/rooms/:id/messages`
- `PATCH /chat/messages/:id/read`
- `PATCH /chat/rooms/:id/read`
- `POST /chat/rooms/:id/participants`
- `PATCH /chat/rooms/:id/participants/:userId/remove`

Calls:
- `POST /calls/rooms/:chatRoomId/initiate`
- `POST /calls/:id/join`
- `POST /calls/:id/media/session`
- `PATCH /calls/:id/status`
- `PATCH /calls/:id/media`
- `POST /calls/:id/end`
- `GET /calls/:id`
- `GET /calls`
- `GET /calls/rooms/:chatRoomId/active`

## API Conventions

- Validation uses DTOs with `class-validator`.
- Unknown properties are rejected (`forbidNonWhitelisted: true`).
- Pagination is widely used for list endpoints.
- For exact request/response schemas, use Swagger UI.

Swagger:
- `http://<host>:<port>/api/docs`
