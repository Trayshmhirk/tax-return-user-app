import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "../components/CheckOutForm";

const stripePromise = loadStripe(
   `${import.meta.env.VITE_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
);

const AddCard = () => {
   return (
      <div className="flex flex-col gap-9">
         <Elements stripe={stripePromise}>
            <CheckOutForm />
         </Elements>
      </div>
   );
};

export default AddCard;
