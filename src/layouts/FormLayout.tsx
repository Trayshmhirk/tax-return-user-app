import { Outlet, useLocation } from "react-router-dom";
import FormImage from "../assets/forms-images.png";

const FormLayout = () => {
   const location = useLocation();

   const isSignUp = location.pathname === "/sign-up";

   return (
      <div className="w-full min-h-screen bg-ghostWhite dark:bg-eerieBlack sm:flex sm:justify-center sm:items-center">
         <div className="w-full h-full flex justify-between md:w-[800px] md:h-[620px] lg:w-[900px] lg:h-[650px] bg-[#E9E9E9] sm:p-1 rounded-xl shadow-lg">
            <div
               className={`hidden ${isSignUp ? "w-[350px]" : "w-[500px]"} overflow-hidden md:block`}
            >
               <img src={FormImage} className="h-full object-contain" />
            </div>
            <Outlet />
         </div>
      </div>
   );
};

export default FormLayout;
