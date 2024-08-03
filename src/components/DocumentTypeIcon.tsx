// import React from 'react'
import DocumentTypeBg from "../assets/document-type-bg.png";

type DocumentTypeIconProps = {
   docType: string;
};

const DocumentTypeIcon = ({ docType }: DocumentTypeIconProps) => {
   const imageStyle = {
      background: `url(${DocumentTypeBg})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      width: "16px",
      height: "20px",
   };

   return (
      <div className="text-center pt-2" style={imageStyle}>
         <div
            style={{
               background: `
                  ${docType === "PDF" ? "#DB6262" : ""}
                  ${docType === "PNG" ? "#B255D3" : ""}
                  ${docType === "XLS" ? "#29CE9C" : ""}
                  ${docType === "DOC" ? "#29B0CE" : ""}
               `,
               height: "8px",
               fontSize: "6px",
               color: "white",
            }}
         >
            {docType}
         </div>
      </div>
   );
};

export default DocumentTypeIcon;
