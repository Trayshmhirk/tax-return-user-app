/* eslint-disable @typescript-eslint/no-explicit-any */

import {
   useStripe,
   useElements,
   CardNumberElement,
   CardExpiryElement,
   CardCvcElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { FaCalendarWeek } from "react-icons/fa";
import { TiInfoLarge } from "react-icons/ti";
import { FaCreditCard } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";
import { Button } from "../ui/button";
import { useTheme } from "@/hooks/useTheme";

const AddCreditCardForm: React.FC = () => {
   const stripe = useStripe();
   const elements = useElements();
   const { theme } = useTheme();

   // const [cardType, setCardType] = useState<string | null>(null);
   const [cardholderName, setCardholderName] = useState("");
   const [error, setError] = useState<string | null>(null);
   const [loading, setLoading] = useState(false);
   const [success, setSuccess] = useState(false);
   const [resetForm, setResetForm] = useState(false);

   const isDark = theme === "dark";

   const CARD_OPTIONS = {
      style: {
         base: {
            color: isDark ? "#ffffff" : "#000000",
            fontSize: "15px",
            fontSmoothing: "antialiased",
            "::placeholder": {
               color: "#A0AEC0",
            },
         },
         invalid: {
            color: isDark ? "#ef4444" : "#c30000",
            iconColor: "#ef4444",
         },
      },
   };

   // Detect card type using Stripe's onChange event
   // const handleCardChange = (event: any) => {
   //    const { brand } = event;
   //    setCardType(brand);
   // };

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!stripe || !elements) return;

      setLoading(true);

      // Create a token with the card details
      const cardNumberElement = elements.getElement(CardNumberElement);
      const { token, error } = await stripe.createToken(cardNumberElement!, {
         name: cardholderName,
      });

      if (error) {
         setError(error.message || "An error occurred");
         setLoading(false);
         setSuccess(false);
         setTimeout(() => setError(null), 2000);
      } else {
         token;
         setError(null);
         setLoading(false);
         setSuccess(true);
         setCardholderName("");
         // Trigger form reset
         setResetForm((prev) => !prev);
         setTimeout(() => setSuccess(false), 2000);
      }
   };

   return (
      <form onSubmit={handleSubmit} className="h-full flex flex-col gap-8">
         <div
            key={resetForm.toString()}
            className="flex flex-col gap-4 mb-auto"
         >
            {/* Card Number Input */}
            <div className="relative flex flex-col gap-3">
               <label className="block text-sm font-medium">Card Number</label>
               <CardNumberElement
                  options={CARD_OPTIONS}
                  // onChange={handleCardChange}
                  className="block w-full bg-white dark:bg-gray text-eerieBlack dark:text-white rounded-md shadow-md dark:shadow-md-dark p-3"
               />

               <FaCreditCard className="absolute bottom-[10px] right-4 text-xl" />
            </div>

            {/* Expiry Date and CVV */}
            <div className="flex space-x-6">
               <div className="relative w-full flex flex-col gap-3">
                  <label className="block text-sm font-medium">
                     Expiry Date
                  </label>
                  <CardExpiryElement
                     options={CARD_OPTIONS}
                     className="block w-full bg-white dark:bg-gray text-eerieBlack dark:text-white rounded-md shadow-md dark:shadow-md-dark p-3"
                  />
                  <FaCalendarWeek className="absolute bottom-[14px] right-4" />
               </div>

               <div className="relative w-full flex flex-col gap-3">
                  <label className="block text-sm font-medium">CVV</label>
                  <CardCvcElement
                     options={CARD_OPTIONS}
                     className="block w-full bg-white dark:bg-gray text-eerieBlack dark:text-white rounded-md shadow-md dark:shadow-md-dark p-3"
                  />
                  <TiInfoLarge className="absolute bottom-[12px] right-4 text-lg" />
               </div>
            </div>

            {/* Cardholder Name Input */}
            <div className="flex flex-col gap-3">
               <label className="block text-sm font-medium">
                  Cardholder Name
               </label>
               <input
                  type="text"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="John Doe"
                  className="block w-full bg-white dark:bg-gray text-eerieBlack dark:text-white rounded-md outline-none shadow-md dark:shadow-md-dark p-3"
               />
            </div>
         </div>

         <div className="flex flex-col gap-5 mb-2">
            {error && (
               <p className="text-bostonRed dark:text-red-500 font-medium text-center">
                  {error}
               </p>
            )}

            {success && (
               <p className="text-green-600 dark:text-green-400 font-medium text-center">
                  Your card has been successfully added!
                  <span role="img" aria-label="party">
                     🎉
                  </span>
               </p>
            )}

            <Button type="submit" disabled={!stripe || loading}>
               {loading ? (
                  <ClipLoader color="#ffffff" size={20} />
               ) : (
                  "Add new card"
               )}
            </Button>
         </div>
      </form>
   );
};

export default AddCreditCardForm;
