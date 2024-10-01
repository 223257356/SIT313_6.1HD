import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your_public_key_here'); // Replace with your Stripe public key

const Payment = () => {
    const handlePayment = async () => {
        const stripe = await stripePromise;
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const sessionId = await response.json();

        const { error } = await stripe.redirectToCheckout({
            sessionId,
        });
        if (error) {
            console.error("Payment Error:", error);
        }
    };

    return (
        <button onClick={handlePayment}>Pay Now</button>
    );
};

export default Payment;
