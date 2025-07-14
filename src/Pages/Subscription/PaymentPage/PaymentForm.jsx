import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useLocation } from "react-router";
import useAuth from "../../../Hooks/useAuth";
// import useAuth from "../../Hooks/useAuth";
const PaymentForm = () => {
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const location = useLocation();
  const { amount, duration } = location.state || {};
//   console.log(duration);
    const {user,setUser}=useAuth()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const amountInCents = amount * 100;
    console.log("in centes", amountInCents);
    setProcessing(true);

    // Step 1: Create payment intent on backend
    try {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        amountInCents, // amount in cents
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
        //USER PREMIUM FIELD UPDATE START HERE
        const now = new Date();
        let premiumUntil;

        if (duration === "1 minitue") {
          premiumUntil = new Date(now.getTime() + 1 * 60 * 1000);
        } else if (duration === '5 days') {
          premiumUntil = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
        } else if (duration === '10 days') {
          premiumUntil = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000);
        }

        await axiosSecure.patch(`/users/${user.email}`, {
          premiumInfo: premiumUntil.toISOString(), // 
        });
        setUser({...user, premiumTaken: premiumUntil.toISOString()})
        alert("user updaed premium")
        //USER PREMIUM FIELD UPDATE ENDS HERE
        alert("Payment succeeded!");
        // Optional: redirect user or update UI
      }
    } catch (err) {
      setError("Payment failed, try again.", err);
      setProcessing(false);
    }
  };
  return (
    // <div className="max-w-xl mx-auto mt-12 bg-gray-200 p-9 rounded-2xl shadow-2xl">
    //   <form onSubmit={handleSubmit}>
    //     <CardElement />
    //     <button
    //       type="submit"
    //       className="mt-14 w-full cursor-pointer btn bg-sky-500 text-white btn-md"
    //       disabled={!stripe || processing}
    //     >
    //       {processing ? "Processing..." : `Pay $${amount}`}
    //     </button>
    //     {error && <p style={{ color: "red" }}>{error}</p>}
    //   </form>
    // </div>

<div className="py-12 lg:py-20 px-2 lg:px-0">
  
    {/* form start */}
    <div className="max-w-2xl mx-auto mt-12 bg-gradient-to-br from-[#F4F6FE] via-[#E0E2F0] to-[#D4D7E3] p-8 rounded-3xl shadow-2xl">
  <form onSubmit={handleSubmit} className="space-y-6">
    <div className="p-4 bg-white rounded-xl shadow-inner">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#211F54',
              '::placeholder': { color: '#A0AEC0' },
              fontFamily: 'inherit',
            },
            invalid: { color: '#E53E3E' },
          },
        }}
      />
    </div>
    <button
      type="submit"
      className="cursor-pointer w-full py-3 bg-gradient-to-r from-[#211F54] to-[#433D7E] text-white font-semibold rounded-full shadow-lg hover:opacity-95 transition"
      disabled={!stripe || processing}
    >
      {processing ? 'Processing...' : `Pay $${amount}`}
    </button>
    {error && (
      <p className="text-center text-sm text-red-600 font-medium">
        {error}
      </p>
    )}
  </form>
</div>
</div>


  );
};

export default PaymentForm;
