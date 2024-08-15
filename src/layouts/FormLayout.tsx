import { Outlet } from "react-router-dom";

const FormLayout = () => {
   return (
      <div className="w-full min-h-screen flex justify-center items-center bg-richElectricBlue">
         <div className="relative flex justify-center items-center">
            <Outlet />
         </div>
      </div>
   );
};

export default FormLayout;
