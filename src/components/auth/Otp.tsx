import { useForm } from "react-hook-form";
import Forms from "./Forms";
import { NavLink } from "react-router-dom";
import CustomButton from "../CustomButton";
import OtpInput from "./OtpInput";

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
   const {
      handleSubmit,
      // register,
      // formState: { errors },
   } = useForm();

   console.log(email);

   const onSubmit = async () => {
      // Check if OTP is empty
      if (!isRecoverPasswordOTP) {
         console.log(email);

         handleNextForm();
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
         <div className="flex flex-col gap-3 mb-auto">
            <OtpInput handleOtpChange={(otp: string) => console.log(otp)} />
            <span className="self-center">
               {`Didn't receive OTP? `}
               <NavLink className="font-bold" to={"/login"}>
                  Resend
               </NavLink>
            </span>
         </div>

         <div className="w-full flex gap-4 text-center">
            <CustomButton type="button" handleClick={handlePrevForm} isPrevBtn>
               Previous
            </CustomButton>
            <CustomButton type="submit">Next</CustomButton>
         </div>
      </Forms>
   );
};

export default Otp;
