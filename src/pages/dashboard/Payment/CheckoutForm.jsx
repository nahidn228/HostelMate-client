import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import useCart from "../../../hooks/useCart";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { AuthContext } from "./../../../providers/AuthProvider";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const axiosSecure = useAxiosSecure();
  const [cart, refetch] = useCart();

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  console.log(totalPrice);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data?.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  // console.log("client SEcret", clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    //confirm payment

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error", confirmError);
      Swal.fire({
        icon: "error",
        title: `${confirmError?.code}`,
        text: `${confirmError?.message}`,
      });
      
    } else {
      console.log("Payment Intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        //now save the payment in the database
        const payment = {
          email: user?.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(),
        };
        const res = await axiosSecure.post("/payments", payment);
        // console.log("Payment saved", res.data);
        refetch();
        console.log("CheckOut Form ----->", res.data);
        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            title: "Thanks for your Subscription ",
            icon: "success",
            draggable: true,
            timer: 1500,
          });
          navigate("/dashboard/paymentHistory");
        }
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="border-2 p-4 rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        ></CardElement>
      </div>
      <button
        className="btn btn-sm my-4 btn-primary "
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      {error ? <p className="text-red-500"> {error} </p> : ""}
      {transactionId ? (
        <p>
          {" "}
          Your Transaction Id:{" "}
          <span className="text-blue-500">{transactionId}</span>{" "}
        </p>
      ) : (
        ""
      )}
    </form>
  );
};

export default CheckoutForm;
