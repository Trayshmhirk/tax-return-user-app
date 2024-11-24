import { useState } from "react";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "../ui/dialog";
import SelectCategory from "../auth/multiform/SelectCategory";
import SelectService from "../auth/multiform/SelectService";

const RequestServiceDialog = ({ children }: ChildrenNode) => {
   const [currentForm, setCurrentForm] = useState(1);
   const [selectedCategory, setSelectedCategory] = useState("");

   const handleNextForm = () => {
      setCurrentForm(currentForm + 1);
   };

   const handlePrevForm = () => {
      setCurrentForm(currentForm - 1);
   };

   return (
      <Dialog>
         <DialogTrigger asChild>{children}</DialogTrigger>

         <DialogContent className="max-w-lg gap-8">
            <DialogHeader className="gap-4">
               <DialogTitle className="font-semibold md:text-xl">
                  {currentForm === 1
                     ? "Select the category you fall under"
                     : "Select the services you require"}
               </DialogTitle>
               <DialogDescription className="hidden" />
            </DialogHeader>

            <div className="w-full min-h-96 h-full flex justify-center overflow-scroll">
               <div className="w-full h-full flex flex-col gap-7 px-1 py-2">
                  {currentForm === 1 && (
                     <SelectCategory
                        isRequestService
                        onNext={handleNextForm}
                        setSelectedCategory={setSelectedCategory}
                     />
                  )}

                  {currentForm === 2 && (
                     <SelectService
                        selectedCategory={selectedCategory}
                        onPrev={handlePrevForm}
                     />
                  )}
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default RequestServiceDialog;
