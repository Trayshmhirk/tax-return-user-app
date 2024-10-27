import { useState } from "react";
import RadioCheckInput from "../../form-components/RadioCheckInput";
import { SelectCategoryPropTypes } from "../../../types/Types";
import { categoryList } from "../../../mocks/MockData";
import Forms from "../Forms";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { Button } from "@/components/ui/button";

const SelectCategory = ({
   isRequestService,
   onNext,
   setSelectedCategory,
   onPrev,
   currentForm,
   formSuccess,
   setFormSuccess,
}: SelectCategoryPropTypes) => {
   const { handleSubmit } = useForm();

   const [isLoading, setIsLoading] = useState(false);
   const [checkedRadio, setCheckedRadio] = useState("");
   const [isButtonDisabled, setIsButtonDisabled] = useState(true);
   const [category, setCategory] = useState("");

   const handleRadioChange = (value: string) => {
      setCheckedRadio(value);
      setIsButtonDisabled(!value);
      setSelectedCategory && setSelectedCategory(value);
      setCategory(value);
   };

   const onSubmit = () => {
      if (isRequestService) {
         setIsLoading(true);

         // Simulate API call with setTimeout
         setTimeout(() => {
            setIsLoading(false);
            category;

            onNext();
         }, 1000); // Mock API call delay of 2 seconds
      } else {
         setIsLoading(true);

         // Simulate API call with setTimeout
         setTimeout(() => {
            setIsLoading(false);
            category;
            setFormSuccess && setFormSuccess(true);

            setTimeout(() => {
               // Next after mock success
               onNext();
            }, 700);
         }, 2000); // Mock API call delay of 2 seconds
      }
   };

   const handlePrevForm = () => {
      onPrev && onPrev();
   };

   return (
      <>
         {isRequestService ? (
            <>
               <div className="flex flex-col gap-7 mb-auto">
                  <div className="flex flex-col gap-4">
                     {categoryList.map((category, index) => (
                        <RadioCheckInput
                           key={index}
                           value={category.name}
                           isRadio
                           isChecked={checkedRadio === `${category.name}`}
                           onRadioAndCheckChange={handleRadioChange}
                        />
                     ))}
                  </div>
               </div>

               <Button
                  onClick={onSubmit}
                  type="submit"
                  disabled={isButtonDisabled || isLoading}
               >
                  {isLoading ? (
                     <ClipLoader color="#ffffff" size={20} />
                  ) : (
                     "Proceed"
                  )}
               </Button>
            </>
         ) : (
            <Forms
               handleSubmit={handleSubmit(onSubmit)}
               title="Select category"
               description=""
               isCurrentForm={currentForm}
               isFormSuccess={formSuccess && formSuccess}
            >
               <div className="flex flex-col gap-3 mb-auto mt-2">
                  {categoryList.map((category, index) => (
                     <RadioCheckInput
                        key={index}
                        value={category.name}
                        isRadio
                        isChecked={checkedRadio === `${category.name}`}
                        onRadioAndCheckChange={handleRadioChange}
                     />
                  ))}
               </div>

               <div className="w-full flex gap-4 text-center">
                  <Button
                     type="button"
                     onClick={handlePrevForm}
                     className="w-full bg-transparent text-richElectricBlue border border-richElectricBlue"
                  >
                     Previous
                  </Button>
                  <Button
                     type="submit"
                     className="w-full"
                     disabled={isButtonDisabled || isLoading}
                  >
                     {isLoading ? (
                        <ClipLoader color="#ffffff" size={20} />
                     ) : (
                        "Next"
                     )}
                  </Button>
               </div>
            </Forms>
         )}
      </>
   );
};

export default SelectCategory;
