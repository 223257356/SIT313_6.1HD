import React from 'react';
import axios from 'axios';

const Checkout = () => {
    const handleCheckout = async () => {
        try {
            // Call your backend to create a checkout session
            const response = await axios.post('http://localhost:4242/create-checkout-session');
            const sessionId = response.data.id;

            // Redirect to Stripe Checkout
            const stripe = window.Stripe('process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY'); // Replace with your Stripe publishable key
            await stripe.redirectToCheckout({ sessionId });
        } catch (error) {
            console.error('Error during checkout:', error);
            alert('Failed to initiate checkout. Please try again.');
        }
    };

    return (
        <div>
            <h2>Checkout</h2>
            <button onClick={handleCheckout}>
                Pay for Premium Plan
            </button>
        </div>
    );
};

export default Checkout;
