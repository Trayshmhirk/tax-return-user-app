import { FaSquareCheck } from "react-icons/fa6";
import { IoRadioButtonOnSharp } from "react-icons/io5";

type RadioCheckInputPropTypes = {
   value: string;
   formDesc?: string;
   isChecked: boolean;
   onRadioAndCheckChange: (
      value: string,
      serviceId: string | undefined
   ) => void;
   isRadio?: boolean;
   isCheckBox?: boolean;
   isPreviewForm?: boolean;
   handleClick?: () => void;
   serviceId?: string;
};

const RadioCheckInput = ({
   value,
   isChecked,
   onRadioAndCheckChange,
   isRadio,
   isCheckBox,
   isPreviewForm,
   handleClick,
   serviceId,
}: RadioCheckInputPropTypes) => {
   const handleRadioAndCheckChange = () => {
      onRadioAndCheckChange(value, serviceId);
   };
   return (
      <label
         className={`
            w-full flex items-center gap-4 bg-white dark:bg-gray px-5 py-3 rounded-lg shadow-md dark:shadow-md-dark hover-shadow-body
            ${isChecked && "border border-richElectricBlue"}
            ${isCheckBox && "flex-col"}
            ${isPreviewForm && "w-[340px] flex-col"}
         `}
         onClick={handleClick}
      >
         {isRadio && (
            <>
               <input
                  className="checked:hidden"
                  type="radio"
                  value={value}
                  onChange={handleRadioAndCheckChange}
                  checked={isChecked}
               />
               <IoRadioButtonOnSharp
                  className={`w-4 h-4 text-richElectricBlue ${isChecked ? "block" : "hidden"}`}
               />
               <span className="text-sm md:text-xl">{value}</span>
            </>
         )}

         {isCheckBox && (
            <div className="flex self-start items-center gap-4">
               <input
                  className="input-checkbox"
                  type="checkbox"
                  value={value}
                  // {...register("checkbox", {
                  //    required: `This field is required`,
                  //    // Add other validation rules as needed
                  // })}
                  onChange={handleRadioAndCheckChange}
                  checked={isChecked}
               />
               <span
                  className={`hidden ${isChecked ? "flex items-center justify-center" : "hidden"}`}
               >
                  <FaSquareCheck />
               </span>
               <span className="text-sm md:text-xl">{value}</span>
            </div>
         )}
      </label>
   );
};

export default RadioCheckInput;
