import * as yup from "yup";

export const createUserSchema = yup.object().shape({
   firstName: yup.string().required("Enter Full Name"),
   lastName: yup.string().required("Enter Full Name"),
   phone: yup.string().required("Phone number is required"),
   email: yup
      .string()
      .email("Invalid email")
      .required("Please input your email"),
   password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password should not be more than 20 characters")
      .required("Please input your password"),
   confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords dont match")
      .required("Please input your password"),
});

export const logInSchema = yup.object().shape({
   email: yup
      .string()
      .email("Please input a correct email")
      .required("Please input your email"),
   password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password should not be more than 20 characters")
      .required("Please input your password"),
});

export const changePasswordSchema = yup.object().shape({
   oldPassword: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password should not be more than 20 characters")
      .required("Please input your password"),
   newPassword: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password should not be more than 20 characters")
      .required("Please input your password"),
});
