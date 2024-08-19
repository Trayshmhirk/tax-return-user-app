import { FaFile } from "react-icons/fa6";

type DocumentTypeIconProps = {
   docType: string;
};

const DocumentTypeIcon = ({ docType }: DocumentTypeIconProps) => {
   return (
      <div className="relative">
         <FaFile className="text-spanishGray w-4 h-5" />
         <div
            style={{
               background: `
                     ${docType === "PDF" ? "#DB6262" : ""}
                     ${docType === "PNG" ? "#B255D3" : ""}
                     ${docType === "JPEG" ? "#B255D3" : ""}
                     ${docType === "XLS" ? "#29CE9C" : ""}
                     ${docType === "DOC" ? "#29B0CE" : ""}
                  `,
               height: "10px",
               color: "white",
            }}
            className="absolute bottom-[3px] w-full text-[7px] text-center rounded-sm"
         >
            {docType}
         </div>
      </div>
   );
};

export default DocumentTypeIcon;
