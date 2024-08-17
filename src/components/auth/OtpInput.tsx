import React, { useState } from "react";

type OtpInputPropType = {
   handleOtpChange: (otp: string) => void;
};

const OtpInput = ({ handleOtpChange }: OtpInputPropType) => {
   const [otp, setOtp] = useState<string[]>(Array(6).fill(""));

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
      const value = e.target.value;

      if (value.length <= 1 && /^\d*$/.test(value)) {
         const newOtp = [...otp];
         newOtp[i] = value;

         setOtp(newOtp);

         // If all inputs are filled, send OTP to the parent component
         if (newOtp.every((digit) => digit.length === 1)) {
            handleOtpChange(newOtp.join(""));
         }

         // Auto-focus next input if current input is filled
         if (i < otp.length - 1 && value.length === 1) {
            const nextInput = document.getElementById(`otpInput${i + 1}`);
            nextInput?.focus();
         }
      }
   };

   const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      i: number
   ) => {
      if (e.key === "Backspace" && otp[i] === "" && i > 0) {
         const prevInput = document.getElementById(`otpInput${i - 1}`);
         prevInput?.focus();
      }
   };

   return (
      <div className="flex items-center justify-between gap-2 mt-4">
         {otp.map((digit, index) => (
            <React.Fragment key={index}>
               <input
                  id={`otpInput${index}`}
                  className="w-11 h-11 sm:w-16 sm:h-14 p-3 sm:py-[15px] sm:px-4 border border-spanishGray text-center font-bold rounded shadow-md outline-none placeholder:text-eerieBlack focus:border-eerieBlack"
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
               />
            </React.Fragment>
         ))}
      </div>
   );
};

export default OtpInput;
