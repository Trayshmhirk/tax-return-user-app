import { useState } from "react";
import CustomButton from "./CustomButton";
import RadioCheckInput from "./RadioCheckInput";
import { SelectCategoryPropTypes } from "../types/AllTypes";
import { categoryList } from "../mocks/AllMockData";
import Forms from "./auth/Forms";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";

const SelectCategory = ({
   isRequestService,
   onNext,
   setSelectedCategory,
   onPrev,
   currentForm,
}: SelectCategoryPropTypes) => {
   const { handleSubmit } = useForm();

   const [isLoading, setIsLoading] = useState(false);
   const [checkedRadio, setCheckedRadio] = useState("");
   const [isButtonDisabled, setIsButtonDisabled] = useState(true);
   const [category, setCategory] = useState("");
   // const [selectedCheckBox, setSelectedCheckBox] = useState([]);

   // const handleCheckBoxChange = (value) => {
   //    setSelectedCheckBox((prevSelected) =>
   //       prevSelected.includes(value)
   //          ? prevSelected.filter((item) => item !== value)
   //          : [...prevSelected, value]
   //    );
   //    setIsButtonDisabled(
   //       selectedCheckBox.length === 1 && selectedCheckBox[0] === value
   //    );
   // };

   const handleRadioChange = (value: string) => {
      setCheckedRadio(value);
      setIsButtonDisabled(!value);
      setSelectedCategory && setSelectedCategory(value);
      setCategory(value);
   };

   const onSubmit = () => {
      if (isRequestService) {
         onNext();
      } else {
         setIsLoading(true);

         // Simulate API call with setTimeout
         setTimeout(() => {
            setIsLoading(false);
            console.log(category);
            // Navigate after mock success
            // navigate("/");
            onNext();
         }, 2000); // Mock API call delay of 2 seconds
      }
   };

   const handlePrevForm = () => {
      onPrev && onPrev();
   };

   return (
      <>
         {isRequestService ? (
            <div className="h-full flex flex-col justify-between">
               <div className="flex flex-col gap-7">
                  <h2 className="font-medium text-xl">
                     Select the category you fall under
                  </h2>

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

               <CustomButton
                  handleClick={onSubmit}
                  type="submit"
                  isDisabled={isButtonDisabled}
                  isLoading={isLoading}
               >
                  Proceed
               </CustomButton>
            </div>
         ) : (
            <Forms
               handleSubmit={handleSubmit(onSubmit)}
               title="Select category"
               description=""
               isCurrentForm={currentForm}
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
                  <CustomButton
                     type="button"
                     handleClick={handlePrevForm}
                     isPrevBtn
                  >
                     Previous
                  </CustomButton>
                  <CustomButton type="submit" isDisabled={isButtonDisabled}>
                     {isLoading ? (
                        <ClipLoader color="#ffffff" size={20} />
                     ) : (
                        "Next"
                     )}
                  </CustomButton>
               </div>
            </Forms>
         )}
      </>
   );
};

export default SelectCategory;
