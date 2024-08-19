type TextAreaPropTypes = {
   label: string;
   placeholder: string;
};

const TextArea = ({ label, placeholder }: TextAreaPropTypes) => {
   return (
      <div className="text-area flex flex-col gap-3">
         <label className="font-bold">{label}</label>
         <textarea
            className="h-36 p-4 outline-0 bg-white dark:bg-darkGray border border-americanSilver rounded"
            placeholder={placeholder}
         />
      </div>
   );
};

export default TextArea;
