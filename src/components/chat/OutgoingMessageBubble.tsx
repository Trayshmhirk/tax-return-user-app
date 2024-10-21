type OutgoingMessageBubblePropTypes = {
   text: string;
   timeStamp: string;
   borderRadius: string;
   isLastMessage: boolean;
};

const OutgoingMessageBubble = ({
   text,
   timeStamp,
   borderRadius,
   isLastMessage,
}: OutgoingMessageBubblePropTypes) => {
   return (
      <div className="w-full flex justify-end">
         <div
            style={{ borderRadius: borderRadius }}
            className="relative min-w-28 max-w-72 md:max-w-[450px] flex flex-col gap-1 py-3 px-4 bg-richElectricBlue text-white"
         >
            {isLastMessage && (
               <div className="absolute bottom-0 -right-[3px] w-[6px] h-[6px] bg-richElectricBlue rounded" />
            )}

            <span className="text text-sm">{text}</span>

            {/* {selectedDocuments && (
               <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                     <DocumentTypeIcon
                        docType={selectedDocuments.documentType}
                     />
                     <p style={{ fontSize: "16px" }}>
                        {truncateString(selectedDocuments?.documentName, 30)}
                     </p>
                  </div>
               </div>
            )} */}
            <div className="text-[10px] self-end">{timeStamp}</div>
         </div>
      </div>
   );
};

export default OutgoingMessageBubble;
