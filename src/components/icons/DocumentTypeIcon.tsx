import { FaFile } from "react-icons/fa6";

type DocumentTypeIconProps = {
   docType: string;
};

const DocumentTypeIcon = ({ docType }: DocumentTypeIconProps) => {
   return (
      <div className="relative">
         <FaFile
            className="w-5 h-6"
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
         <div className="absolute bottom-[5px] w-full text-[7px] text-center font-medium text-white">
            {docType}
         </div>
      </div>
   );
};

export default DocumentTypeIcon;
