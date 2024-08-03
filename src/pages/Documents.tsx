import { useNavigate } from "react-router-dom";
import UploadPdfImage from "../components/UploadPdfImage";

const uploadedDocuments = [
   {
      id: "id1",
      title: "document",
      document_size: "20",
      document_type: "pdf",
   },
   {
      id: "id2",
      title: "document",
      document_size: "20",
      document_type: "pdf",
   },
];

const Documents = () => {
   const navigate = useNavigate();

   const handleNavigateUploadDocument = () => {
      navigate("/upload-document");
   };

   return (
      <div className="flex flex-col gap-8">
         <UploadPdfImage
            isUploadDoc
            handleClick={handleNavigateUploadDocument}
         />

         <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xl">
               <p className="font-medium">Uploaded documents</p>

               <span className="fw-normal ">
                  {uploadedDocuments && uploadedDocuments.length
                     ? `(${uploadedDocuments.length})`
                     : "(0)"}
               </span>
            </div>

            <div>search</div>
         </div>
      </div>
   );
};

export default Documents;
