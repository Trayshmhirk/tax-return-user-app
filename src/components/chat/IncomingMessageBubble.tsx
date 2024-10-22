import { truncateString } from "@/helpers/truncateString";
import { DocumentsPropTypes } from "@/types/Types";
import DocumentTypeIcon from "../icons/DocumentTypeIcon";
import { mapFileTypeToDocumentType } from "@/helpers/mapFileType";

type IncomingMessageBubblePropTypes = {
   text: string;
   timeStamp: string;
   borderRadius: string;
   isLastMessage: boolean;
   document: DocumentsPropTypes;
};

const IncomingMessageBubble = ({
   text,
   timeStamp,
   borderRadius,
   isLastMessage,
   document,
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

            {document && (
               <div className="flex items-center gap-3">
                  <DocumentTypeIcon
                     docType={mapFileTypeToDocumentType(document.document_type)}
                  />
                  <p style={{ fontSize: "16px" }}>
                     {truncateString(document.document_name, 60)}
                  </p>

                  {/* <div onClick={handleDownload} className="me-auto">
                        <img src={DownloadIcon} />
                     </div> */}
               </div>
            )}
            <div className="text-[10px] self-end">{timeStamp}</div>
         </div>
      </div>
   );
};

export default IncomingMessageBubble;
