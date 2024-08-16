import { Outlet } from "react-router-dom";

const FormLayout = () => {
   return (
      <div className="w-full min-h-screen bg-richElectricBlue sm:flex sm:justify-center sm:items-center">
         <Outlet />
      </div>
   );
};

export default FormLayout;
