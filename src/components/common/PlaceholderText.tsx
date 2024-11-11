type PlaceholderTextPropType = {
   text: string;
   isServiceChats?: boolean;
};

const PlaceholderText = ({ text, isServiceChats }: PlaceholderTextPropType) => {
   return (
      <div
         className={`${isServiceChats ? "" : "h-full"} flex items-center justify-center py-10`}
      >
         <p className="pending-text text-center">{text}</p>
      </div>
   );
};

export default PlaceholderText;
