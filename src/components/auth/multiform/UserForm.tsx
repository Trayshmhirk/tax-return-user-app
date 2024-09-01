import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createUserSchema } from "../../../validation/schema";
import { ISignUpForm } from "../../../types/AllTypes";
import { SetStateAction, useState } from "react";
import Forms from "../Forms";
import FormInput from "../../form-components/FormInput";
import { ClipLoader } from "react-spinners";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

type UserFormPropTypes = {
   onNext: () => void;
   currentForm: number;
   setOTPEmail: React.Dispatch<SetStateAction<string>>;
   formSuccess: { completed: boolean; index: number }[];
   setFormSuccess: (success: boolean) => void;
};

const UserForm = ({
   onNext,
   currentForm,
   setOTPEmail,
   formSuccess,
   setFormSuccess,
}: UserFormPropTypes) => {
   const [isLoading, setIsLoading] = useState(false);
   const [loginError] = useState<string | null>(null);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<ISignUpForm>({ resolver: yupResolver(createUserSchema) });

   const onSubmit = async (data: ISignUpForm) => {
      setIsLoading(true);
      setOTPEmail(data.email);

      // Simulate API call with setTimeout
      setTimeout(() => {
         setIsLoading(false);
         setFormSuccess(true);

         setTimeout(() => {
            // Next after mock success
            onNext();
         }, 700);
      }, 2000); // Mock API call delay of 2 seconds
   };

   return (
      <Forms
         handleSubmit={handleSubmit(onSubmit)}
         title="Create account"
         description="Please enter your details"
         isCurrentForm={currentForm}
         isFormSuccess={formSuccess}
      >
         <div className="flex flex-col gap-3 mb-auto overflow-y-auto">
            <div className="flex flex-col gap-4 sm:flex-row">
               <FormInput<ISignUpForm>
                  label="First name"
                  type="text"
                  register={register}
                  name="firstName"
                  placeholder="First name"
                  error={errors}
               />
               <FormInput<ISignUpForm>
                  label="Last name"
                  type="text"
                  register={register}
                  name="lastName"
                  placeholder="Last name"
                  error={errors}
               />
            </div>

            <FormInput<ISignUpForm>
               label="Phone"
               type="text"
               register={register}
               name="phone"
               placeholder="0812 367 3468"
               error={errors}
            />
            <FormInput<ISignUpForm>
               label="Email address"
               type="email"
               register={register}
               name="email"
               placeholder="Example@email.com"
               error={errors}
            />

            <div className="flex flex-col gap-4 sm:flex-row">
               <FormInput<ISignUpForm>
                  label="Password"
                  type="password"
                  register={register}
                  name="password"
                  placeholder="Password"
                  error={errors}
               />
               <FormInput<ISignUpForm>
                  label="Confirm password"
                  type="password"
                  register={register}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  error={errors}
               />
            </div>
         </div>

         {loginError && (
            <p className="text-red-500 text-center">{loginError}</p>
         )}

         <div className="w-full text-center flex flex-col gap-3">
            <Button type="submit" disabled={isLoading}>
               {isLoading ? <ClipLoader color="#ffffff" size={20} /> : "Next"}
            </Button>
            <span className="self-center text-sm">
               {`Already have an account? `}
               <NavLink className="font-semibold" to={"/login"}>
                  Log in
               </NavLink>
            </span>
         </div>
      </Forms>
   );
};

export default UserForm;
