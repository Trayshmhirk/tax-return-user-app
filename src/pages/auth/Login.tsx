import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Forms from "../../components/auth/Forms";
import { logInSchema } from "../../validation/schema";
import FormInput from "../../components/auth/FormInput";
import { ILoginForm } from "../../types/AllTypes";
import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

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

      console.log(data);

      //  // Simulate API call with setTimeout
      setTimeout(() => {
         setIsLoading(false);
         console.log("Login successful");
         // Navigate after mock success
         navigate("/");
      }, 2000); // Mock API call delay of 2 seconds
   };

   // const onSubmit = async () => {
   //    if (!email || !password) {
   //       // handle empty fields
   //       console.log("Username or password is empty");
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

   //             console.log(response.data);
   //          });
   //       navigate("/");
   //    } catch (error) {
   //          setLoginError("Login failed. Please check your credentials and try again.");
   //       if (error.response) {
   //          // The request was made and the server responded with a status code
   //          // that falls out of the range of 2xx
   //          console.log(error.response.data);
   //          console.log(error.response.status);
   //          console.log(error.response.headers);
   //       } else if (error.request) {
   //          // The request was made but no response was received
   //          console.log(error.request);
   //       } else {
   //          // Something happened in setting up the request that triggered an Error
   //          console.log("Error", error.message);
   //       }
   //    }
   // };

   return (
      <Forms
         handleSubmit={handleSubmit(onSubmit)}
         title="Welcome back!"
         description="Please enter your details"
      >
         <div className="flex flex-col gap-4 mb-auto">
            <FormInput
               label="Email address"
               type="email"
               register={register}
               name="email"
               placeholder="Example@email.com"
               error={errors}
            />
            <FormInput
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
            <CustomButton type="submit" isDisabled={isLoading}>
               {isLoading ? <ClipLoader color="#ffffff" size={20} /> : "Log in"}
            </CustomButton>
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
