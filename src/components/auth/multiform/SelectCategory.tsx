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
   const { data: categories = [] } = useGetCategoriesQuery();

   const [isSubmitting, setIsSubmitting] = useState(false);
   const [checkedRadio, setCheckedRadio] = useState("");
   const [isButtonDisabled, setIsButtonDisabled] = useState(true);

   const handleRadioChange = (value: string) => {
      setCheckedRadio(value);
      setIsButtonDisabled(!value);
      setSelectedCategory && setSelectedCategory(value);
   };

   const onSubmit = () => {
      setIsSubmitting(!isSubmitting);

      if (isRequestService) {
         setTimeout(() => {
            setIsSubmitting(!isSubmitting);

            onNext();
         }, 300);
      } else {
         setTimeout(() => {
            setIsSubmitting(!isSubmitting);

            setFormSuccess && setFormSuccess(true);

            setTimeout(() => {
               // Next after mock success
               onNext();
            }, 300);
         }, 300);
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
                  disabled={isButtonDisabled || isSubmitting}
               >
                  {isSubmitting ? (
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
                     disabled={isButtonDisabled || isSubmitting}
                  >
                     {isSubmitting ? (
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
