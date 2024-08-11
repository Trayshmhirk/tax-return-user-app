import { useState } from "react";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";
import RadioCheckInput from "./RadioCheckInput";

type SelectCategoryPropTypes = {
   isSelectCategory: boolean;
   onNext: () => void;
   setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

type CategoryListTypes = {
   name: string;
   category_id: string;
};

const categoryList: CategoryListTypes[] = [
   {
      name: "Individuals",
      category_id: "",
   },
   {
      name: "Partnership",
      category_id: "",
   },
   {
      name: "Corporation",
      category_id: "",
   },
   {
      name: "Sole Proprietorship",
      category_id: "",
   },
   {
      name: "Others",
      category_id: "",
   },
];

const SelectCategory = ({
   isSelectCategory,
   onNext,
   setSelectedCategory,
}: SelectCategoryPropTypes) => {
   const navigate = useNavigate();

   const [checkedRadio, setCheckedRadio] = useState("");
   const [isButtonDisabled, setIsButtonDisabled] = useState(true);
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
      setSelectedCategory(value);
   };

   const onSubmit = () => {
      isSelectCategory
         ? onNext()
         : navigate("/retention-form", {
              //   state: { data: selectedCheckBox },
           });
   };

   // const handlePrevForm = () => {
   //    navigate(-1);
   // };

   return (
      <>
         {isSelectCategory ? (
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
                  isDisabled={isButtonDisabled}
               >
                  Proceed
               </CustomButton>
            </div>
         ) : (
            <></>
            // <FormLayout>
            //    <FormContainer
            //       handleLogin={handleSubmit(onSubmit)}
            //       description="Select the category you fall under"
            //       isCategoryDesc
            //       isCurrentForm={3}
            //    >
            //       <div className="d-flex flex-column gap-3 overflow-y-scroll mb-auto p-1">
            //          {categoryList.map((category, index) => (
            //             <RadioAndCheckLabel
            //                key={index}
            //                value={category.name}
            //                register={register}
            //                isCheckBox
            //                isChecked={selectedCheckBox.includes(
            //                   `${category.name}`
            //                )}
            //                onRadioAndCheckChange={handleCheckBoxChange}
            //             />
            //          ))}
            //       </div>

            //       <div className="w-100 text-center d-flex gap-4">
            //          <CustomButton
            //             type="button"
            //             handleClick={handlePrevForm}
            //             isPrevBtn
            //          >
            //             Previous
            //          </CustomButton>
            //          <CustomButton type="submit" isDisabled={isButtonDisabled}>
            //             Next
            //          </CustomButton>
            //       </div>
            //    </FormContainer>
            // </FormLayout>
         )}
      </>
   );
};

export default SelectCategory;
