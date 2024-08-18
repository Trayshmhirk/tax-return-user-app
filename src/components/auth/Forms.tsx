import { FaAngleLeft } from "react-icons/fa6";

type FormLayoutPropType = {
   children: React.ReactNode;
   handleSubmit: () => void;
   title: string;
   description: string;
   isCurrentForm?: number;
   isDocUpload?: boolean;
   onCancel?: () => void;
};

const Forms = ({
   children,
   handleSubmit,
   title,
   description,
   isCurrentForm,
   isDocUpload,
   onCancel,
}: FormLayoutPropType) => {
   const totalForms = 4;

   // Helper function to render form index as circles with lines
   const renderFormIndex = () => {
      const formIndex = [];

      for (let i = 1; i <= totalForms; i++) {
         formIndex.push(
            <div key={i} className="flex items-center">
               <div
                  className={`flex items-center justify-center w-9 h-9 font-medium rounded-full border-[3px] ${
                     isCurrentForm && i <= isCurrentForm
                        ? "bg-richElectricBlue text-white border-richElectricBlue"
                        : "bg-white text-mutedGray border-spanishGray"
                  }`}
               >
                  {i}
               </div>
               {/* Render connecting line except for the last item */}
               {i < totalForms && (
                  <div
                     className={`w-12 h-[3px] sm:w-14 ${
                        isCurrentForm && i < isCurrentForm
                           ? "bg-richElectricBlue"
                           : "bg-spanishGray"
                     }`}
                  ></div>
               )}
            </div>
         );
      }

      return formIndex;
   };

   return (
      <form
         className={`relative w-full h-full flex flex-col justify-center gap-7 px-6 py-8 bg-white dark:bg-gray text-eerieBlack dark:text-white z-30 ${isCurrentForm ? "md:w-[540px]" : "md:w-[400px]"}  sm:px-12 sm:py-10 sm:rounded-xl`}
         onSubmit={handleSubmit}
      >
         {isDocUpload && (
            <div
               onClick={onCancel}
               className="w-8 h-8 flex items-center justify-center bg-bubbles dark:bg-mutedGray rounded-md cursor-pointer"
            >
               <FaAngleLeft className="font-light text-lg" />
            </div>
         )}

         <div className="flex flex-col items-center gap-4 text-center">
            {!isCurrentForm && (
               <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/external-flatarticons-blue-flatarticons/65/external-tax-taxes-flatarticons-blue-flatarticons.png"
                  alt="external-tax-taxes-flatarticons-blue-flatarticons"
               />
            )}

            <div className="flex flex-col gap-1">
               <h2 className="text-2xl font-bold">{title}</h2>
               <p className="text-xs">{description}</p>
            </div>

            {isCurrentForm && (
               <div className="w-full flex justify-center">
                  {renderFormIndex()}
               </div>
            )}
         </div>

         {children}
      </form>
   );
};

export default Forms;
