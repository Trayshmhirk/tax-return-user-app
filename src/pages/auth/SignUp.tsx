import { useState } from "react";
import UserForm from "../../components/auth/multiform/UserForm";
import Otp from "../../components/auth/multiform/Otp";
import SelectCategory from "../../components/auth/multiform/SelectCategory";
import UploadForm from "../../components/auth/multiform/UploadForm";

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
               title="OTP verification"
               description="Please enter your OTP (one-time password)"
               onNext={handleNextForm}
               currentForm={currentForm}
               email={email}
               onPrev={handlePrevForm}
            />
         )}

         {currentForm === 3 && (
            <SelectCategory
               onNext={handleNextForm}
               onPrev={handlePrevForm}
               currentForm={currentForm}
            />
         )}

         {currentForm === 4 && (
            <UploadForm onPrev={handlePrevForm} currentForm={currentForm} />
         )}
      </>
   );
};

export default SignUp;