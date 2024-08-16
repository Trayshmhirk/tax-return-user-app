import { FaAngleLeft } from "react-icons/fa6";

type FormLayoutPropType = {
   children: React.ReactNode;
   handleSubmit: () => void;
   title: string;
   description: string;
   isCurrentForm?: number;
   isCategoryDesc?: boolean;
   isDocUpload?: boolean;
   onCancel?: () => void;
};

const Forms = ({
   children,
   handleSubmit,
   title,
   description,
   isCurrentForm,
   isCategoryDesc,
   isDocUpload,
   onCancel,
}: FormLayoutPropType) => {
   const totalForms = 5;
   //
   const renderFormIndex = () => {
      const formIndex = [];

      for (let i = 1; i <= totalForms; i++) {
         formIndex.push(
            <div
               key={i}
               className={`form-index h-[5px] bg-americanSilver rounded-lg ${isCurrentForm && i <= isCurrentForm && "bg-richElectricBlue"}`}
            ></div>
         );
      }

      return formIndex;
   };

   return (
      <form
         className="relative w-full h-full flex flex-col justify-center gap-5 px-6 py-8 bg-white z-30 sm:w-[600px] sm:h-[600px] sm:px-16 sm:py-10 sm:rounded-xl"
         onSubmit={handleSubmit}
      >
         {isDocUpload ? (
            <div
               onClick={onCancel}
               className="w-8 h-8 flex items-center justify-center bg-bubbles dark:bg-mutedGray rounded-md cursor-pointer"
            >
               <FaAngleLeft className="font-light text-lg" />
            </div>
         ) : (
            <>{/*  <img className="h-[54px]" src={AppLogo} alt="" /> */}</>
         )}

         {isCurrentForm && (
            <div className="flex gap-1">{renderFormIndex()}</div>
         )}

         <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className={`${isCategoryDesc ? "text-xl font-medium" : ""}`}>
               {description}
            </p>
         </div>

         {children}
      </form>
   );
};

export default Forms;
