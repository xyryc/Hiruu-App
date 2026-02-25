# Stripe Subscription Backend API (Frontend Contract)

This document defines the backend contract required by the React Native frontend for Stripe subscriptions.

Base URL prefix: `/api/v1/billing`  
Auth: Bearer token (except webhook)  
Content-Type: `application/json`

---

## 1) Get Plans

### `GET /plans`

Returns active subscription plans with Stripe price references for monthly/yearly billing.

### Response `200`

```json
{
  "success": true,
  "message": "plans_retrieved_successfully",
  "data": [
    {
      "id": "plan_uuid",
      "name": "Premium User",
      "description": "Premium features for users",
      "type": "user",
      "isActive": true,
      "monthly": {
        "priceId": "price_monthly_xxx",
        "amount": 999,
        "currency": "usd",
        "interval": "month"
      },
      "yearly": {
        "priceId": "price_yearly_xxx",
        "amount": 9999,
        "currency": "usd",
        "interval": "year",
        "discountPercentage": 17
      }
    }
  ]
}
```

---

## 2) Create PaymentSheet Session

### `POST /subscription/sheet`

Creates Stripe PaymentSheet payload for app checkout.

### Request Body

```json
{
  "planId": "plan_uuid",
  "interval": "month"
}
```

`interval` must be: `"month"` or `"year"`.

### Backend behavior

1. Validate `planId` + `interval`
2. Resolve Stripe `priceId`
3. Create/find Stripe customer for current user
4. Create ephemeral key
5. Create payment intent

### Response `200`

```json
{
  "success": true,
  "message": "subscription_sheet_created_successfully",
  "data": {
    "customerId": "cus_xxx",
    "ephemeralKey": "ek_test_xxx",
    "paymentIntentClientSecret": "pi_xxx_secret_xxx"
  }
}
```

### Response `400/404`

```json
{
  "success": false,
  "message": "invalid_plan_or_interval",
  "data": null
}
```

---

## 3) Get Current Subscription

### `GET /subscription/me`

Returns current user subscription status from backend DB (synced by Stripe webhooks).

### Response `200`

```json
{
  "success": true,
  "message": "subscription_retrieved_successfully",
  "data": {
    "status": "active",
    "planId": "plan_uuid",
    "interval": "month",
    "currentPeriodEnd": "2026-03-31T23:59:59.000Z",
    "cancelAtPeriodEnd": false,
    "stripeCustomerId": "cus_xxx",
    "stripeSubscriptionId": "sub_xxx"
  }
}
```

### If no subscription

```json
{
  "success": true,
  "message": "no_active_subscription",
  "data": null
}
```

---

## 4) Cancel Subscription

### `POST /subscription/cancel`

### Request Body

```json
{
  "cancelAtPeriodEnd": true
}
```

### Response `200`

```json
{
  "success": true,
  "message": "subscription_cancel_updated",
  "data": {
    "status": "active",
    "cancelAtPeriodEnd": true,
    "currentPeriodEnd": "2026-03-31T23:59:59.000Z"
  }
}
```

---

## 5) Stripe Webhook (Required)

### `POST /webhook`

No auth. Must validate `stripe-signature` with raw body.

### Required events

- `invoice.paid`
- `invoice.payment_failed`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- (optional) `checkout.session.completed` if checkout sessions are used

### Requirement

Webhook must update local subscription table. Frontend treats backend as source of truth via `GET /subscription/me`.

---

## Expected subscription status values

- `trialing`
- `active`
- `past_due`
- `canceled`
- `unpaid`
- `incomplete`
- `incomplete_expired`

---

## Backend env vars

```env
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

---

## Minimum DB fields per user subscription

- `userId`
- `stripeCustomerId`
- `stripeSubscriptionId`
- `stripePriceId`
- `planId`
- `interval`
- `status`
- `cancelAtPeriodEnd`
- `currentPeriodEnd`

