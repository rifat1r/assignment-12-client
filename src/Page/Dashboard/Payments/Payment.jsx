import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
  const location = useLocation();
  const { price, classId } = location.state || {};

  console.log("status", price, classId);

  const stripePromis = loadStripe(import.meta.env.VITE_payment_gateway_PK);
  console.log("type check", typeof price);
  return (
    <div>
      <h2>Payment : {price}</h2>
      <div>
        <Elements stripe={stripePromis}>
          <CheckoutForm classId={classId} price={price}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
