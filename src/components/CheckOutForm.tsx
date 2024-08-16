import {
   useStripe,
   useElements,
   CardElement,
   // PaymentElement,
} from "@stripe/react-stripe-js";
import { FormEventHandler, useState } from "react";

const CheckOutForm = () => {
   const stripe = useStripe();
   const elements = useElements();

   const cardOPtions = { hidePostalCode: true, disableLink: true };

   const [card, setCard] = useState({
      name: "",
      number: "",
      expiry: "",
      cvv: "",
   });
   const [cardResponse] = useState("");
   // const [tokenError, setTokenError] = useState(null);

   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const { name, value } = e.target;

      // CARD NUMBER
      if (name === "number") {
         const onlyNumeric = value.replace(/\D/g, "");
         const formattedCard = onlyNumeric.replace(/(.{4})/g, "$1 ");
         setCard((prev) => ({ ...prev, [name]: formattedCard }));
      }

      // EXPIRY DATE
      else if (name === "expiry") {
         const onlyNumeric = value.replace(/\D/g, "");
         let formattedExpiryDate = "";

         // Extract and validate the month (MM)
         const month = onlyNumeric.slice(0, 2);
         if (month) {
            const numericMonth = parseInt(month, 10);

            if (numericMonth >= 1 && numericMonth <= 12) {
               formattedExpiryDate = month; // Remove leading zeros
            } else {
               // Handle invalid month input
               formattedExpiryDate = "0";
            }
         }

         // Extract the year (YY)
         const year = onlyNumeric.slice(2, 4);
         if (year) {
            formattedExpiryDate += `/${year}`;
         }

         setCard((prev) => ({ ...prev, [name]: formattedExpiryDate }));
      }

      // CVV
      else if (name === "cvv") {
         const cvv = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
         setCard((prev) => ({ ...prev, [name]: cvv.slice(0, 3) }));
      } else {
         setCard((prev) => ({ ...prev, [name]: value }));
      }
   }

   const handleSubmit = async (event: FormEventHandler<HTMLFormElement>) => {
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      console.log(event);

      if (!stripe || !elements) {
         // Stripe.js hasn't yet loaded.
         // Make sure to disable form submission until Stripe.js has loaded.
         return;
      }

      const result = await stripe.confirmPayment({
         //`Elements` instance that was used to create the Payment Element
         elements,
         confirmParams: {
            return_url: "https://example.com/order/123/complete",
         },
      });

      if (result.error) {
         // Show error to your customer (for example, payment details incomplete)
         console.log(result.error.message);
      } else {
         // Your customer will be redirected to your `return_url`. For some payment
         // methods like iDEAL, your customer will be redirected to an intermediate
         // site first to authorize the payment, then redirected to the `return_url`.
      }
   };

   return (
      <form
         onSubmit={() => handleSubmit}
         onClick={(e) => {
            e.stopPropagation();
         }}
         className=""
      >
         <div className="bg-primary rounded-3 -mx-3 p-3 text-white">
            <p className="text-sm fw-medium ">
               <span className="text-underline decoration-2 underline-offset-8">
                  PRE-IN
               </span>
               SPECTED
            </p>
            <p className="fs-4 fw-bold mt-2">CREATE NEW CARD</p>
         </div>

         {/* //>card name */}
         <label className="mt-">
            <p className="fw-medium">Name on Card</p>
            <input
               value={card.name}
               onChange={handleChange}
               type="text"
               name="name"
               className="mt-1 w-full focus:ring-0 p-3 rounded text-sm fw-medium border-gray-500"
               placeholder="John Doe"
            />
         </label>

         {/* //>Stripe card number */}
         <label className="">
            <p className="fw-medium">Card Details</p>
            <div className="w-full focus:ring-0 py-1 pl-3 rounded text-sm fw-medium border-gray-500 border mt-1">
               <CardElement
                  options={cardOPtions}
                  className="text-lg mt- focus:ring-0 p-3 rounded text- fw-medium border-gray-500 text-white"
               />
            </div>
         </label>

         <div
            className={`
               ${cardResponse ? "d-flex justify-content-center" : "d-none"} 
               justify-center items-center
            `}
         >
            <p className="fw-medium ">{cardResponse}</p>
         </div>

         {/* <PaymentElement /> */}
         <button
            type="submit"
            className=" rounded-3 w-100 bg-primary text-white py-4"
            disabled={!stripe}
         >
            Create Card
         </button>
      </form>
   );
};

export default CheckOutForm;
