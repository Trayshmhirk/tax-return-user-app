import { Outlet } from "react-router-dom";
import FormImage from "../assets/forms-images.png";

const FormLayout = () => {
   return (
      <div className="w-full min-h-screen bg-ghostWhite dark:bg-eerieBlack sm:flex sm:justify-center sm:items-center">
         <div className="flex justify-between w-[900px] h-[650px] bg-[#E9E9E9] p-1 rounded-xl shadow-lg">
            <div className="w-[500px] overflow-hidden">
               <img src={FormImage} className="h-full object-contain" />
            </div>
            <Outlet />
         </div>
      </div>
   );
};

export default FormLayout;
