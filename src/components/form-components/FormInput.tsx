import { useState } from "react";
import {
   FieldErrors,
   FieldValues,
   Path,
   UseFormRegister,
} from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

type FormInputPropTypes<T extends FieldValues> = {
   label: string;
   register: UseFormRegister<T>;
   name: Path<T>; // Use ValidInputNames here
   error?: FieldErrors<T>;
   isReadOnly?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FormInput = <T extends FieldValues>({
   label,
   type,
   register,
   name,
   error,
   ...rest
}: FormInputPropTypes<T>) => {
   const [showPassword, setShowPassword] = useState(false);

   const togglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
   };

   // Extract error message as a string or default to an empty string
   const errorMessage = error?.[name]?.message as string | undefined;

   return (
      <div className="w-full flex flex-col gap-1">
         <div className="">
            <label
               htmlFor={name}
               className="w-fit text-sm text-mutedGray dark:text-ghostWhite font-bold"
            >
               {label}
            </label>
         </div>

         <div
            className={`h-12 flex justify-between py-3 px-5 border ${
               errorMessage
                  ? "border-[#dc3545] dark:border-red-500"
                  : "border-spanishGray"
            } rounded`}
         >
            <input
               id={name}
               className="w-full outline-none dark:bg-transparent"
               type={type === "password" && showPassword ? "text" : type}
               {...register(name as Path<T>)}
               {...rest}
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
         {errorMessage && (
            <p className="text-[#dc3545] dark:text-red-500 text-xs">
               {errorMessage}
            </p>
         )}
      </div>
   );
};

export default FormInput;
