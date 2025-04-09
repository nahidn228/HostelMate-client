import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

//TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PG_API_KEY);
const Payment = () => {
  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center bg-white px-4">
    <div className="w-full max-w-lg border border-[#142943] rounded-xl p-6">
      <h2 className="text-xl font-semibold text-[#142943] mb-4 text-center">
        Make Payment 
      </h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
      <p className="text-sm text-gray-500 text-center mt-4">
        Secured by Stripe
      </p>
    </div>
  </div>
  );
};

export default Payment;
