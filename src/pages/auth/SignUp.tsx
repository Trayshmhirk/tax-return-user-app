import { useState } from "react";
import UserForm from "../../components/auth/multiform/UserForm";
import Otp from "../../components/auth/multiform/Otp";
import SelectCategory from "../../components/auth/multiform/SelectCategory";
import UploadForm from "../../components/auth/multiform/UploadForm";

const SignUp = () => {
   const [currentForm, setCurrentForm] = useState(1);
   const [email, setEmail] = useState("");
   const [formSuccess, setFormSuccess] = useState([
      { completed: false, index: 1 },
      { completed: false, index: 2 },
      { completed: false, index: 3 },
      { completed: false, index: 4 },
   ]); // Track success for each form

   const handleNextForm = () => {
      setCurrentForm(currentForm + 1);
   };

   const handlePrevForm = () => {
      setCurrentForm(currentForm - 1);
   };

   // Update the success state for the current form
   const updateFormSuccess = (success: boolean) => {
      setFormSuccess((prevSuccess) => {
         const updatedSuccess = [...prevSuccess];
         updatedSuccess[currentForm - 1].completed = success;
         return updatedSuccess;
      });
   };

   return (
      <>
         {currentForm === 1 && (
            <UserForm
               onNext={handleNextForm}
               currentForm={currentForm}
               setOTPEmail={setEmail}
               formSuccess={formSuccess}
               setFormSuccess={(success) => updateFormSuccess(success)}
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
               formSuccess={formSuccess}
               setFormSuccess={(success) => updateFormSuccess(success)}
            />
         )}

         {currentForm === 3 && (
            <SelectCategory
               onNext={handleNextForm}
               onPrev={handlePrevForm}
               currentForm={currentForm}
               formSuccess={formSuccess}
               setFormSuccess={(success) => updateFormSuccess(success)}
            />
         )}

         {currentForm === 4 && (
            <UploadForm
               onPrev={handlePrevForm}
               currentForm={currentForm}
               formSuccess={formSuccess}
               setFormSuccess={(success) => updateFormSuccess(success)}
            />
         )}
      </>
   );
};

export default SignUp;
