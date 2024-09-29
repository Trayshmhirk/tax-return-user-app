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
      <div className="w-full h-full flex justify-center overflow-hidden bg-white dark:bg-gray p-5 md:p-8 rounded-xl md:rounded-2xl shadow-md dark:shadow-md-dark">
         <div className="w-full max-w-7xl h-full flex flex-col gap-7 overflow-auto px-1 pb-2">
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
      </div>
   );
};

export default RequestService;
