import { IoRadioButtonOnSharp } from "react-icons/io5";

type RadioInputPropTypes = {
   value: string;
   isChecked: boolean;
   onRadioChange: (value: string, serviceId: string | undefined) => void;
   serviceId?: string;
};

const RadioInput = ({
   value,
   isChecked,
   onRadioChange,
   serviceId,
}: RadioInputPropTypes) => {
   const handleRadioChange = () => {
      onRadioChange(value, serviceId);
   };
   return (
      <label
         className={`
            w-full flex items-center gap-4 bg-white dark:bg-gray px-5 py-3 rounded-lg shadow-md dark:shadow-md-dark hover-shadow-body
            ${isChecked && "border border-richElectricBlue"}
         `}
      >
         <input
            className="checked:hidden"
            type="radio"
            value={value}
            onChange={handleRadioChange}
            checked={isChecked}
         />
         <IoRadioButtonOnSharp
            className={`w-4 h-4 text-richElectricBlue ${isChecked ? "block" : "hidden"}`}
         />
         <span className="text-sm">{value}</span>
      </label>
   );
};

export default RadioInput;