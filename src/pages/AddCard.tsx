import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "../components/CheckOutForm";

const stripePromise = loadStripe(
   `${import.meta.env.VITE_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
);

const AddCard = () => {
   // const [clientSecret, setClientSecret] = useState("");

   // useEffect(() => {
   //    // Fetch the client secret from your backend server
   //    fetch("/api/payment-intent", {
   //       method: "POST",
   //       headers: {
   //          "Content-Type": "application/json",
   //       },
   //       body: JSON.stringify({
   //          /* any necessary data */
   //       }),
   //    })
   //       .then((response) => response.json())
   //       .then((data) => {
   //          setClientSecret(data.clientSecret);
   //       });
   // }, []);

   // const options = {
   //    // passing the client secret obtained from the server
   //    clientSecret,
   // };

   return (
      <div className="flex flex-col gap-9">
         <Elements stripe={stripePromise}>
            <CheckOutForm />
         </Elements>

         {/* {clientSecret && (
            <Elements stripe={stripePromise} options={options}>
               <CheckOutForm />
            </Elements>
         )} */}
      </div>
   );
};

export default AddCard;
