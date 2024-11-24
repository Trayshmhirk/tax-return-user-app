import { truncateString } from "@/helpers/truncateString";
import DocumentTypeIcon from "@/components/icons/DocumentTypeIcon";
import { mapFileTypeToDocumentType } from "@/helpers/mapFileType";

const OutgoingMessageBubble = ({
   text,
   timeStamp,
   borderRadius,
   isLastMessage,
   document,
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

            {document && (
               <div className="flex items-center gap-3">
                  <DocumentTypeIcon
                     docType={mapFileTypeToDocumentType(document.document_type)}
                  />

                  <p className="text-sm">
                     {truncateString(document.document_name, 60)}
                  </p>
               </div>
            )}
            <div className="text-[10px] self-end">{timeStamp}</div>
         </div>
      </div>
   );
};

export default OutgoingMessageBubble;
