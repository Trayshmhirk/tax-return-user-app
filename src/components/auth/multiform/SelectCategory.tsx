import { useState } from "react";
import RadioInput from "../../form-components/RadioInput";
import { SelectCategoryPropType } from "../../../types/Types";
import Forms from "../Forms";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { useGetCategoriesQuery } from "@/redux/api/apiSlice";

const SelectCategory = ({
   isRequestService,
   onNext,
   setSelectedCategory,
   onPrev,
   currentForm,
   formSuccess,
   setFormSuccess,
}: SelectCategoryPropType) => {
   const { handleSubmit } = useForm();
   const { data: categories = [], isLoading } = useGetCategoriesQuery();

   const [checkedRadio, setCheckedRadio] = useState("");
   const [isButtonDisabled, setIsButtonDisabled] = useState(true);

   const handleRadioChange = (value: string) => {
      setCheckedRadio(value);
      setIsButtonDisabled(!value);
      setSelectedCategory && setSelectedCategory(value);
   };

   const onSubmit = () => {
      // setIsLoading(true);
      if (isRequestService) {
         setTimeout(() => {
            // setIsLoading(false);

            onNext();
         }, 1000);
      } else {
         setTimeout(() => {
            // setIsLoading(false);
            setFormSuccess && setFormSuccess(true);

            setTimeout(() => {
               // Next after mock success
               onNext();
            }, 700);
         }, 2000);
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
                     {categories.map((category, index) => (
                        <RadioInput
                           key={index}
                           value={category.name}
                           isChecked={checkedRadio === `${category.name}`}
                           onRadioChange={handleRadioChange}
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
                  {categories.map((category, index) => (
                     <RadioInput
                        key={index}
                        value={category.name}
                        isChecked={checkedRadio === `${category.name}`}
                        onRadioChange={handleRadioChange}
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
