import { useState } from "react";

type AccordionProps = {
   question: string;
   answer: string | string[];
};

export const Accordion = ({ question, answer }: AccordionProps) => {
   const [isOpen, setIsOpen] = useState(false);

   const handleToggle = () => {
      setIsOpen(!isOpen);
   };

   return (
      <div className="accordion">
         <div className="flex flex-col bg-white dark:bg-gray p-4 rounded-md shadow-md dark:shadow-md-dark">
            <h2 className="accordion-header py-1" onClick={handleToggle}>
               <button
                  className="font-semibold rounded-md w-full text-left"
                  type="button"
               >
                  {question}
               </button>
            </h2>
            <div
               className={`overflow-hidden transition-height duration-500 ease-in-out ${
                  isOpen ? "max-h-screen" : "max-h-0"
               }`}
            >
               <div className="w-full h-[1px] bg-eerieBlack dark:bg-white my-3 opacity-30" />

               <div className="accordion-body py-1">
                  <div className="flex flex-col gap-2">
                     {Array.isArray(answer) ? (
                        answer.map((ans, index) => <p key={index}>{ans}</p>)
                     ) : (
                        <p>{answer}</p>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
