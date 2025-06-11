import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}`); // Replace with your Stripe publishable key

export default function StripeWrapper({ children }) {
    return (
        <Elements stripe={stripePromise}>
            {children}
        </Elements>
    );
}
