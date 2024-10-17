type MessageInPropTypes = {
   text: string;
   timeStamp: string;
   borderRadius: "" | "16px 16px 16px 0px" | "16px 16px 0px 16px";
};
const MessageIn = ({ text, timeStamp, borderRadius }: MessageInPropTypes) => {
   return (
      <div className="w-full flex justify-start">
         <div
            style={{ borderRadius: borderRadius }}
            className={`min-w-28 max-w-72 md:max-w-[450px] flex flex-col gap-1 py-3 px-4 bg-white dark:bg-mutedGray ${borderRadius ? "" : "rounded-lg"}`}
         >
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

export default MessageIn;
