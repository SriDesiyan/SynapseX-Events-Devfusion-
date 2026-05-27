// Razorpay payment helpers
// Requires server endpoint at /{serverUrl}/api/payments/create-order

export async function createRazorpayOrder(eventId, userId, amount) {
  // Call server endpoint to create Razorpay order
  // Server must use Razorpay secret key (never expose in client code)
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL ? `${import.meta.env.VITE_SERVER_URL}/api/payments/create-order` : '/api/payments/create-order',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId, userId, amount }),
    }
  );

  if (!response.ok) {
    throw new Error(`Order creation failed: ${response.statusText}`);
  }

  const data = await response.json();
  // Expected: { orderId, keyId, amount, currency }
  return data;
}

export function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function openRazorpayCheckout(orderData, userEmail, userName, onSuccess, onError) {
  // orderData: { orderId, keyId, amount, currency }
  const options = {
    key: orderData.keyId,
    amount: orderData.amount,
    currency: orderData.currency || 'INR',
    order_id: orderData.orderId,
    handler: async (response) => {
      // On success, call the onSuccess callback with payment data
      onSuccess(response);
    },
    prefill: {
      email: userEmail,
      name: userName,
    },
    theme: {
      color: '#06b6d4', // Cyan-400
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.on('payment.failed', (response) => {
    onError(response.error);
  });
  razorpay.open();
}

export async function verifyPayment(paymentData) {
  // Call server endpoint to verify payment
  // Server must use Razorpay secret key to validate
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL ? `${import.meta.env.VITE_SERVER_URL}/api/payments/verify` : '/api/payments/verify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData),
    }
  );

  if (!response.ok) {
    throw new Error(`Payment verification failed: ${response.statusText}`);
  }

  return response.json();
  // Expected: { verified: true/false, paymentId }
}
