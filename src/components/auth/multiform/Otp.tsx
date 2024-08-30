import { useForm } from "react-hook-form";
import Forms from "../Forms";
import CustomButton from "../../form-components/CustomButton";
import OtpInput from "../../form-components/OtpInput";
import { ClipLoader } from "react-spinners";
import { useState } from "react";

type OtpPropTypes = {
   title: string;
   description: string;
   email: string;
   currentForm: number;
   onNext: () => void;
   onPrev: () => void;
   isRecoverPasswordOTP?: boolean;
   formSuccess: { completed: boolean; index: number }[];
   setFormSuccess: (success: boolean) => void;
};

const Otp = ({
   title,
   description,
   email,
   currentForm,
   onNext,
   onPrev,
   isRecoverPasswordOTP,
   formSuccess,
   setFormSuccess,
}: OtpPropTypes) => {
   const [otp, setOtp] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [loginMessage, setLoginMessage] = useState<string | null>(null);
   const {
      handleSubmit,
      // register,
      // formState: { errors },
   } = useForm();

   const onSubmit = async () => {
      // Check for OTP length and validity
      if (otp.length < 6) {
         setError("Invalid OTP: Please enter a 6-digit code.");
         return; // Prevent further form submission
      }

      // Check if OTP is empty
      setIsLoading(true);

      // Simulate API call with setTimeout
      setTimeout(() => {
         setIsLoading(false);
         email;
         otp;

         // Replace with your actual OTP validation logic
         if (otp === "123456") {
            setError("");
            setLoginMessage("OTP verification successful!");
            setFormSuccess(true);
            setTimeout(() => {
               setLoginMessage("");
               onNext();
            }, 700);
         } else {
            setError("Invalid OTP: Please try again.");
         }
      }, 2000);
   };

   const handlePrevForm = () => {
      onPrev();
   };

   return (
      <Forms
         handleSubmit={handleSubmit(onSubmit)}
         title={title}
         description={description}
         isCurrentForm={isRecoverPasswordOTP ? undefined : currentForm}
         isFormSuccess={formSuccess}
      >
         <div className="flex flex-col gap-6 mb-auto">
            <OtpInput handleOtpChange={(otp: string) => setOtp(otp)} />
            <span className="self-center">
               {`Didn't receive OTP? `}
               <span className="font-bold text-richElectricBlue underline cursor-pointer">
                  Resend
               </span>
            </span>
         </div>

         {error && (
            <div className="text-bostonRed dark:text-red-500 text-center">
               {error}
            </div>
         )}
         {loginMessage && <p className="text-center">{loginMessage}</p>}

         <div className="w-full flex gap-4 text-center">
            <CustomButton
               type="button"
               handleClick={handlePrevForm}
               className="bg-transparent text-richElectricBlue border border-richElectricBlue"
               isNoBorder
            >
               Previous
            </CustomButton>
            <CustomButton
               type="submit"
               isDisabled={isLoading}
               isLoading={isLoading}
            >
               {isLoading ? <ClipLoader color="#ffffff" size={20} /> : "Next"}
            </CustomButton>
         </div>
      </Forms>
   );
};

export default Otp;
