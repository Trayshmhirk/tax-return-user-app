type IncomingMessageBubblePropTypes = {
   text: string;
   timeStamp: string;
   borderRadius: string;
   isLastMessage: boolean;
};

const IncomingMessageBubble = ({
   text,
   timeStamp,
   borderRadius,
   isLastMessage,
}: IncomingMessageBubblePropTypes) => {
   return (
      <div className="w-full flex justify-start">
         <div
            style={{ borderRadius: borderRadius }}
            className="relative min-w-28 max-w-72 md:max-w-[450px] flex flex-col gap-1 py-3 px-4 bg-white dark:bg-mutedGray"
         >
            {isLastMessage && (
               <div className="absolute bottom-0 -left-[3px] w-[6px] h-[6px] bg-white dark:bg-mutedGray rounded" />
            )}

            <span className="text-sm">{text}</span>

            {/* {selectedDocuments && (
               <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                     <DocumentTypeIcon
                        docType={selectedDocuments.documentType}
                     />
                     <p>
                        {isMobileView
                           ? truncateString(selectedDocuments?.documentName, 20)
                           : truncateString(
                                selectedDocuments?.documentName,
                                30
                             )}
                     </p>

                     <div onClick={handleDownload} className="me-auto">
                        <img src={DownloadIcon} />
                     </div>
                  </div>
               </div>
            )} */}
            <div className="text-[10px] self-end">{timeStamp}</div>
         </div>
      </div>
   );
};

export default IncomingMessageBubble;
