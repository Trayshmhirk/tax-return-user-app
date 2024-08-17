import { useState } from "react";
import UserForm from "../../components/auth/UserForm";

const SignUp = () => {
   const [currentForm, setCurrentForm] = useState(1);

   const handleNextForm = () => {
      setCurrentForm(currentForm + 1);
   };

   return (
      <>
         {currentForm === 1 && (
            <UserForm onNext={handleNextForm} currentForm={currentForm} />
         )}

         {currentForm === 2 && <div>Select Category</div>}
      </>
   );
};

export default SignUp;
