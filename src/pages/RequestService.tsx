import { useState } from "react";
import SelectCategory from "../components/auth/multiform/SelectCategory";
import SelectService from "../components/auth/multiform/SelectService";

const RequestService = () => {
   const [currentForm, setCurrentForm] = useState(1);
   const [selectedCategory, setSelectedCategory] = useState("");

   const handleNextForm = () => {
      setCurrentForm(currentForm + 1);
   };

   return (
      <div className="h-full flex flex-col self-center">
         {currentForm === 1 && (
            <SelectCategory
               isRequestService
               onNext={handleNextForm}
               setSelectedCategory={setSelectedCategory}
            />
         )}

         {currentForm === 2 && (
            <SelectService selectedCategory={selectedCategory} />
         )}
      </div>
   );
};

export default RequestService;
