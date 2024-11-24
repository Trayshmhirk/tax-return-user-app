type PlaceholderTextPropType = {
   text: string;
   isServiceChats?: boolean;
   isPendingUpload?: boolean;
};

const PlaceholderText = ({
   text,
   isServiceChats,
   isPendingUpload,
}: PlaceholderTextPropType) => {
   return (
      <div
         className={`${isServiceChats ? "" : "h-full"} flex items-center justify-center ${
            isPendingUpload ? "" : "py-10"
         }`}
      >
         <p className="pending-text text-center">{text}</p>
      </div>
   );
};

export default PlaceholderText;
