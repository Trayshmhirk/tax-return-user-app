import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardForm from "../../components/payment/CardForm";

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
      <div className="w-full h-full flex flex-col gap-4 bg-white dark:bg-gray px-6 py-5 md:px-10 md:py-7 rounded-2xl">
         <h1 className="text-base font-semibold md:text-xl">Add new card</h1>

         <div className="w-full h-[1px] bg-eerieBlack dark:bg-white opacity-20" />

         <Elements stripe={stripePromise}>
            <CardForm />
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
