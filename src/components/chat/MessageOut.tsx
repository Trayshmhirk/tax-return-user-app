type MessageOutPropTypes = {
   text: string;
   timeStamp: string;
   borderRadius: "" | "16px 16px 16px 0px" | "16px 16px 0px 16px";
};

const MessageOut = ({ text, timeStamp, borderRadius }: MessageOutPropTypes) => {
   return (
      <div className="w-full flex justify-end">
         <div
            style={{ borderRadius: borderRadius }}
            className={`min-w-28 max-w-72 md:max-w-[450px] flex flex-col gap-1 py-3 px-4 bg-bubbles dark:bg-richElectricBlue text-eerieBlack dark:text-white ${borderRadius ? "" : "rounded-lg"}`}
         >
            <span className="text">{text}</span>

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
            <div className="text-xs self-end">{timeStamp}</div>
         </div>
      </div>
   );
};

export default MessageOut;
