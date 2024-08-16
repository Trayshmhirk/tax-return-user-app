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
         className="relative w-full h-full flex flex-col justify-center gap-7 px-6 py-8 bg-white dark:bg-gray text-eerieBlack dark:text-white z-30 sm:w-[400px] sm:px-12 sm:py-10 sm:rounded-xl"
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

         <div className="flex flex-col items-center gap-4 text-center">
            <img
               width="48"
               height="48"
               src="https://img.icons8.com/external-flatarticons-blue-flatarticons/65/external-tax-taxes-flatarticons-blue-flatarticons.png"
               alt="external-tax-taxes-flatarticons-blue-flatarticons"
            />

            <div className="flex flex-col gap-1">
               <h2 className="text-2xl font-bold">{title}</h2>
               <p className={`${isCategoryDesc ? "" : "text-xs"}`}>
                  {description}
               </p>
            </div>
         </div>

         {children}
      </form>
   );
};

export default Forms;
