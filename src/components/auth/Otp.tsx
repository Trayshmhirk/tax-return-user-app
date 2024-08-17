import { useForm } from "react-hook-form";
import Forms from "./Forms";
import { NavLink } from "react-router-dom";
import CustomButton from "../CustomButton";
import OtpInput from "./OtpInput";
import { ClipLoader } from "react-spinners";
import { useState } from "react";

type OtpPropTypes = {
   title: string;
   description: string;
   email: string;
   currentForm: number;
   handleNextForm: () => void;
   onPrev: () => void;
   isRecoverPasswordOTP?: boolean;
};

const Otp = ({
   title,
   description,
   email,
   currentForm,
   handleNextForm,
   onPrev,
   isRecoverPasswordOTP,
}: OtpPropTypes) => {
   const [otp, setOtp] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [loginMessage, setLoginMessage] = useState<string | null>(null);

   const {
      handleSubmit,
      // register,
      // formState: { errors },
   } = useForm();

   const onSubmit = async () => {
      // Check if OTP is empty
      if (!isRecoverPasswordOTP) {
         console.log(email);
         console.log(otp);

         setIsLoading(true);

         // Simulate API call with setTimeout
         setTimeout(() => {
            setIsLoading(false);
            setLoginMessage("OTP verification successful!");

            setTimeout(() => {
               setLoginMessage("");
               handleNextForm();
            }, 2000);

            // Navigate after mock success
            // navigate("/");
         }, 2000);
      } else {
         // try {
         //    const response = await api.post("/confirm-pin", {
         //       type: "email",
         //       email: "harlex.mikkey@gmail.com",
         //       pin: otp,
         //    });
         //    console.log(response.data);
         // } catch (error) {
         //    if (error.response) {
         //       // The request was made and the server responded with a status code
         //       // that falls out of the range of 2xx
         //       console.log(error.response.data);
         //       console.log(error.response.status);
         //       console.log(error.response.headers);
         //    } else if (error.request) {
         //       // The request was made but no response was received
         //       console.log(error.request);
         //    } else {
         //       // Something happened in setting up the request that triggered an Error
         //       console.log("Error", error.message);
         //    }
         //    if (error.response) {
         //       setError({
         //          otpError: error.response.data.message,
         //       });
         //    }
         // }
         // handleNextForm();
      }
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
      >
         {/* {errors.otp && (
            <div className="text-danger mb-3">{errors.message}</div>
         )} */}
         <div className="flex flex-col gap-6 mb-auto">
            <OtpInput handleOtpChange={(otp: string) => setOtp(otp)} />
            <span className="self-center">
               {`Didn't receive OTP? `}
               <NavLink className="font-bold" to={"/login"}>
                  Resend
               </NavLink>
            </span>
         </div>

         {loginMessage && <p className="text-center">{loginMessage}</p>}

         <div className="w-full flex gap-4 text-center">
            <CustomButton type="button" handleClick={handlePrevForm} isPrevBtn>
               Previous
            </CustomButton>
            <CustomButton type="submit" isDisabled={isLoading}>
               {isLoading ? <ClipLoader color="#ffffff" size={20} /> : "Next"}
            </CustomButton>
         </div>
      </Forms>
   );
};

export default Otp;
