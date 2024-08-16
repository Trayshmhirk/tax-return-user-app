import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { ILoginForm } from "../../types/AllTypes";

type FormInputPropTypes = {
   label: string;
   type: string;
   register: UseFormRegister<ILoginForm>;
   name: keyof ILoginForm;
   error?: FieldErrors<ILoginForm>;
   placeholder: string;
   isReadOnly?: boolean;
};

const FormInput = ({
   label,
   type,
   register,
   name,
   error,
   placeholder,
   isReadOnly,
}: FormInputPropTypes) => {
   const [showPassword, setShowPassword] = useState(false);

   const togglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
   };

   return (
      <div className="flex flex-col gap-1 input">
         <div className="">
            <label className="w-fit text-sm text-mutedGray font-bold">
               {label}
            </label>
         </div>

         <div
            className={`h-12 flex justify-between py-3 px-5 border  ${error && error[name] ? "border-[#dc3545]" : "border-spanishGray"} rounded`}
         >
            <input
               className="w-full outline-none"
               placeholder={placeholder}
               type={type === "password" && showPassword ? "text" : type}
               {...register(name)}
               readOnly={isReadOnly}
            />
            {type === "password" && (
               <button
                  type="button"
                  className="bg-transparent w-fit"
                  onClick={togglePasswordVisibility}
               >
                  {showPassword ? (
                     <FaEyeSlash className="text-spanishGray text-lg" />
                  ) : (
                     <FaEye className="text-spanishGray text-lg" />
                  )}
               </button>
            )}
         </div>
         {error && error[name] && (
            <p className="text-[#dc3545] text-xs">{error[name].message}</p>
         )}
      </div>
   );
};

export default FormInput;
