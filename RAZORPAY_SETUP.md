# Razorpay Payment Integration Guide

This document explains how to set up the Razorpay payment backend for the SynapseX Events app.

## Overview

The client-side code in `src/firebase/payments.js` provides payment helpers that communicate with a backend server. The server must:

1. Create Razorpay orders using the **secret key** (never expose in client code)
2. Verify payment signatures after payment completion
3. Validate business logic (event exists, price matches, etc.)

## Environment Setup

### Client Side (.env.local)

Add your Razorpay **public key** to `.env.local`:

```env
VITE_RAZORPAY_KEY_ID=rzp_live_YOUR_PUBLIC_KEY
VITE_SERVER_URL=http://localhost:3001  # Optional: if server runs on different port
```

### Server Side (.env or similar)

Store your Razorpay **secret key** securely on the server:

```env
RAZORPAY_KEY_SECRET=rzp_live_YOUR_SECRET_KEY
RAZORPAY_KEY_ID=rzp_live_YOUR_PUBLIC_KEY
```

**⚠️ IMPORTANT:** Never commit the secret key to version control. Use environment variables or secrets manager.

## API Endpoints

### 1. POST `/api/payments/create-order`

**Purpose:** Create a Razorpay order

**Request Body:**
```json
{
  "eventId": "event_doc_id",
  "userId": "user_uid",
  "amount": 2500  // in paise (25 INR = 2500 paise)
}
```

**Response Body:**
```json
{
  "orderId": "order_1A2B3C4D5E",
  "keyId": "rzp_live_YOUR_PUBLIC_KEY",
  "amount": 2500,
  "currency": "INR"
}
```

**Server Implementation Notes:**
- Fetch event from Firestore to verify price matches request
- Multiply amount by 100 when creating Razorpay order (convert currency to paise)
- Use Razorpay SDK or REST API: `POST https://api.razorpay.com/v1/orders`
- Return `orderId` and `keyId` (public key can be safely sent to client)

### 2. POST `/api/payments/verify`

**Purpose:** Verify Razorpay payment signature

**Request Body:**
```json
{
  "razorpay_order_id": "order_1A2B3C4D5E",
  "razorpay_payment_id": "pay_1X2Y3Z4W5V",
  "razorpay_signature": "signature_hash",
  "eventId": "event_doc_id",
  "userId": "user_uid"
}
```

**Response Body:**
```json
{
  "verified": true,
  "paymentId": "pay_1X2Y3Z4W5V",
  "bookingId": "booking_doc_id"  // Optional: if you also create booking on server
}
```

**Server Implementation Notes:**
- Use Razorpay SDK to verify signature: `hmac_sha256(order_id|payment_id, secret_key) == signature`
- If verified, update the booking document in Firestore with `paymentStatus: "completed"` and `paymentId`
- Return `verified: true/false`
- Log payment data for records

## Sample Express Server Implementation

Here's a minimal example (use as reference):

```javascript
// server.js
import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { db } from './firebase.js';  // Your Firebase admin SDK
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const app = express();
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post('/api/payments/create-order', async (req, res) => {
  try {
    const { eventId, userId, amount } = req.body;

    // Fetch event from Firestore to verify price
    const eventRef = doc(db, 'events', eventId);
    const eventSnap = await getDoc(eventRef);
    if (!eventSnap.exists()) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const event = eventSnap.data();
    if (event.price * 100 !== amount) {
      return res.status(400).json({ error: 'Amount mismatch' });
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount,  // in paise
      currency: 'INR',
      receipt: `event_${eventId}_${userId}`,
    });

    res.json({
      orderId: order.id,
      keyId: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.post('/api/payments/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, eventId, userId } = req.body;

    // Verify signature
    const hmac = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (hmac !== razorpay_signature) {
      return res.status(400).json({ verified: false, error: 'Signature mismatch' });
    }

    // Update booking in Firestore
    // Assuming booking was created with paymentStatus: 'pending' before payment
    // Find booking by userId & eventId, then update
    const bookingsRef = collection(db, 'bookings');
    const q = query(
      bookingsRef,
      where('userId', '==', userId),
      where('eventId', '==', eventId),
      where('paymentStatus', '==', 'pending')
    );
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return res.status(404).json({ verified: false, error: 'Booking not found' });
    }

    const bookingDoc = snapshot.docs[0];
    await updateDoc(bookingDoc.ref, {
      paymentStatus: 'completed',
      paymentId: razorpay_payment_id,
    });

    res.json({
      verified: true,
      paymentId: razorpay_payment_id,
      bookingId: bookingDoc.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ verified: false, error: 'Verification failed' });
  }
});

app.listen(3001, () => console.log('Payment server running on :3001'));
```

## Client Integration (EventDetails.jsx)

The `EventDetails` component uses these helpers in the `handleBookTicket` function:

1. Create a **pending** booking in Firestore
2. Call `createRazorpayOrder()` to get `orderId` and `keyId`
3. Load Razorpay script and open checkout
4. On payment success, call `verifyPayment()` with payment data
5. On verification success, booking `paymentStatus` is updated to **completed** on server

See `src/pages/EventDetails.jsx` for implementation.

## Testing

### Sandbox Mode (Recommended)

Use Razorpay test keys:
- **Public Key:** `rzp_test_...`
- **Secret Key:** `rzp_test_...`

Test card details (from Razorpay docs):
- Card: `4111 1111 1111 1111`
- Expiry: Any future date
- CVV: Any 3-digit number

### Production Mode

Switch to live keys and update `.env.local` and server `.env` once verified.

## Security Checklist

- [ ] Secret key stored securely on server (never in repo)
- [ ] Public key in `.env.local` is safe (public by design)
- [ ] Payment signature verified on server before updating booking
- [ ] Event price verified on server before creating order
- [ ] HTTPS enabled in production
- [ ] Error messages don't leak sensitive info to client
- [ ] Rate limit payment endpoints to prevent abuse

## Troubleshooting

**"Order creation failed"**
- Check server is running on correct port
- Verify `VITE_SERVER_URL` in `.env.local` matches server address
- Check server error logs

**"Payment verification failed"**
- Ensure server has correct Razorpay secret key
- Verify signature calculation is correct
- Check booking exists in Firestore with correct userId & eventId

**"Razorpay script not loading"**
- Check browser console for CSP errors
- Verify internet connection (external script load)

## References

- [Razorpay API Docs](https://razorpay.com/api/)
- [Razorpay Node.js SDK](https://github.com/razorpay/razorpay-node)
- [Razorpay Payment Gateway Integration](https://razorpay.com/docs/payments/payment-gateway/payments-link/)
