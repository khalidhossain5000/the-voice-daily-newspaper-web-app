import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useLocation } from "react-router";
const PaymentForm = () => {
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);


  const location = useLocation();
  const { amount } = location.state || {};
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const amountInCents=amount * 100
    console.log("in centes",amountInCents);
    setProcessing(true);

    // Step 1: Create payment intent on backend
    try {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        amountInCents // amount in cents
      });

      const clientSecret = data.clientSecret;

      // Step 2: Confirm Card Payment
      const card = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card,
            billing_details: {
              name: "User Name", // get from user context or form
            },
          },
        }
      );

      if (error) {
        setError(error.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        setError("");
        setProcessing(false);
        alert("Payment succeeded!");
        // Optional: redirect user or update UI
      }
    } catch (err) {
      setError("Payment failed, try again.",err);
      setProcessing(false);
    }
  };
  return (
    <div className="max-w-xl mx-auto mt-12 bg-gray-200 p-9 rounded-2xl shadow-2xl">
        <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" className="mt-14 w-full cursor-pointer btn bg-sky-500 text-white btn-md" disabled={!stripe || processing}>
        {processing ? 'Processing...' : `Pay $${amount}`}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
    </div>
  );
};

export default PaymentForm;
