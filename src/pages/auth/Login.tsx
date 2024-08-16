import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Forms from "../../components/auth/Forms";
import { logInSchema } from "../../validation/schema";

export type ILoginForm = {
   email: string;
   password: string;
};

const Login = () => {
   const {
      // register,
      handleSubmit,
      // formState: { errors },
   } = useForm<ILoginForm>({ resolver: yupResolver(logInSchema) });

   const onSubmit = () => {};
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
         <div className="flex flex-col gap-3 mb-auto"></div>
      </Forms>
   );
};

export default Login;
