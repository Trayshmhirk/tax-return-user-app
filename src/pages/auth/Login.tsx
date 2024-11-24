import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Forms from "@/components/auth/Forms";
import { logInSchema } from "@/validation/schema";
import FormInput from "@/components/form-components/FormInput";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { Button } from "@/components/ui/button";

const Login = () => {
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);
   const [loginError] = useState<string | null>(null);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<ILoginForm>({ resolver: yupResolver(logInSchema) });

   const onSubmit = async (data: ILoginForm) => {
      setIsLoading(true);
      data;

      //  // Simulate API call with setTimeout
      setTimeout(() => {
         setIsLoading(false);

         navigate("/");
      }, 2000); // Mock API call delay of 2 seconds
   };

   // const onSubmit = async () => {
   //    if (!email || !password) {
   //       // handle empty fields
   //       return;
   //    }

   //    try {
   //       await api
   //          .post("/login", {
   //             email: email,
   //             password: password,
   //          })
   //          .then((response) => {
   //             dispatch(setUserProfile(response.data.security));
   //          });
   //       navigate("/");
   //    } catch (error) {
   //          setLoginError("Login failed. Please check your credentials and try again.");
   //    }
   // };

   return (
      <Forms
         handleSubmit={handleSubmit(onSubmit)}
         title="Welcome back!"
         description="Please enter your details"
      >
         <div className="flex flex-col gap-4 mb-auto">
            <FormInput<ILoginForm>
               label="Email address"
               type="email"
               register={register}
               name="email"
               placeholder="Example@email.com"
               error={errors}
            />
            <FormInput<ILoginForm>
               label="Password"
               type="password"
               register={register}
               name="password"
               placeholder="Password"
               error={errors}
            />

            <NavLink
               className="self-end font-semibold text-xs"
               to={"/password-recovery"}
            >
               Forgot password?
            </NavLink>
         </div>

         {loginError && (
            <p className="text-red-500 text-center">{loginError}</p>
         )}

         <div className="w-full text-center flex flex-col gap-3">
            <Button type="submit" disabled={isLoading}>
               {isLoading ? <ClipLoader color="#ffffff" size={20} /> : "Log in"}
            </Button>
            <span className="self-center text-sm">
               {`Don't have an account? `}
               <NavLink className="font-semibold" to={"/sign-up"}>
                  Sign up
               </NavLink>
            </span>
         </div>
      </Forms>
   );
};

export default Login;
