// CheckoutForm.tsx
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { Link } from "react-router-dom";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState(100); // USD

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement!);

    if (error) {
      alert(error.message);
      return;
    }

    // Send token to backend
    const response = await axios.post(
      `https://api-hotel-production-ee3e.up.railway.app/api/stripe/charge`,
      {
        amount: amount,
        currency: "usd",
        token: token.id,
      },
      {
        headers: {
          "Accept": "application/json",
        },
      }
    );

    if (response.data.success) {
      <Link to="/success" />;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Amount (USD):</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        required
      />
      <label>Card Details:</label>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutForm;
