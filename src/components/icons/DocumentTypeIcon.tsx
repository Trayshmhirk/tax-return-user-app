import { FaFile } from "react-icons/fa6";

type DocumentTypeIconProps = {
   docType: string;
   isGridView?: boolean;
};

const DocumentTypeIcon = ({ docType, isGridView }: DocumentTypeIconProps) => {
   return (
      <div className="relative">
         <FaFile
            className={`${isGridView ? "w-7 h-8" : "w-5 h-6 text-base"}`}
            style={{
               color: `
                  ${docType === "PDF" ? "#DB6262" : ""}
                  ${docType === "PNG" ? "#B255D3" : ""}
                  ${docType === "JPEG" ? "#B255D3" : ""}
                  ${docType === "XLS" ? "#29CE9C" : ""}
                  ${docType === "DOC" ? "#29B0CE" : ""}
               `,
            }}
         />
         <div
            className={`absolute bottom-[5px] w-full ${isGridView ? "text-[9px]" : "text-[7px] leading-[8px]"} text-center font-medium text-white `}
         >
            {docType}
         </div>
      </div>
   );
};

export default DocumentTypeIcon;
