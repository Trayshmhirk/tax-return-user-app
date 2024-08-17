import { useState } from "react";
import UserForm from "../../components/auth/UserForm";
import Otp from "../../components/auth/Otp";

const SignUp = () => {
   const [currentForm, setCurrentForm] = useState(1);
   const [email, setEmail] = useState("");

   const handleNextForm = () => {
      setCurrentForm(currentForm + 1);
   };

   const handlePrevForm = () => {
      setCurrentForm(currentForm - 1);
   };

   return (
      <>
         {currentForm === 1 && (
            <UserForm
               onNext={handleNextForm}
               currentForm={currentForm}
               setOTPEmail={setEmail}
            />
         )}

         {currentForm === 2 && (
            <Otp
               title="Otp verification"
               description="Please enter your OTP (one-time password)"
               handleNextForm={handleNextForm}
               currentForm={currentForm}
               email={email}
               onPrev={handlePrevForm}
            />
         )}
      </>
   );
};

export default SignUp;
