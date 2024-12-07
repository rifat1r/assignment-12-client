import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price, classId }) => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  useEffect(() => {
    if (price > 0) {
      axiosSecure
        .post("/create-payment-intent", {
          price: price,
        })
        .then((res) => {
          console.log("client secret", res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [price, axiosSecure]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }
    //confirm cart payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("payment error", confirmError);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        console.log("transaction Id", paymentIntent.id);
        // save payment in the database
        const payment = {
          email: user?.email,
          price: parseInt(price),
          transactionId: paymentIntent.id,
          date: new Date(),
          classId: classId,
        };
        const res = await axiosSecure.post("/payment", payment);
        console.log("payment saved", res.data);

        if (res.data?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thank you for the taka poisa",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/myEnrollClass");
        }
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto card shadow-xl rounded-lg mt-52 p-4 ">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl my-2 font-medium">Amount : {price}</h2>
        <CardElement
          className="bg-base-200 p-3 rounded-lg"
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
        />
        <button className="btn btn-primary btn-block btn-md mt-5">Pay</button>
        <p>{error}</p>
        {transactionId && (
          <h2 className="text-center text-xl text-red-500">
            Transaction id : {transactionId}
          </h2>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
