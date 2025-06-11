import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

export default function BookingPaymentForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const bookingData = {
        check_in_date: '2025-06-18',
        check_out_date: '2025-06-19',
        room_ids: [39],
        payment_method: 'credit_card',
        total_payment: 120.00,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setLoading(true);
        setMessage('');

        const cardElement = elements.getElement(CardElement);

        // Step 1: Create Stripe token
        const { error, token } = await stripe.createToken(cardElement);

        if (error) {
            setMessage(error.message);
            setLoading(false);
            return;
        }

        // Step 2: Send booking data to API
        try {
            const response = await axios.post(`${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}`, {
                ...bookingData,
                stripe_token: token.id,
            });

            setMessage('Booking successful!');
            // Optionally redirect to success page here
        } catch (err) {
            setMessage('Booking failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2>Complete Your Payment</h2>
            <CardElement options={{ hidePostalCode: true }} />
            <button type="submit" disabled={!stripe || loading} style={{ marginTop: '20px' }}>
                {loading ? 'Processing...' : 'Pay $120.00'}
            </button>
            {message && <p>{message}</p>}
        </form>
    );
}
