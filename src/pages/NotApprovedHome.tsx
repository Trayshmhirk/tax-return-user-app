import { useState } from "react";
import Hero from "../components/Hero";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaAngleLeft } from "react-icons/fa6";

type StateProp = {
   documentNumber: string;
};

const NotApprovedHome = () => {
   const [selectedDocument, setSelectedDocument] = useState<StateProp | null>(
      null
   );
   const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([]); // Changed to array of strings

   const handleUploadDocument = (documentNumber: string) => {
      // Set the selected document for further use
      setSelectedDocument({ documentNumber });
      setUploadedDocuments((prevUploaded) => [...prevUploaded, documentNumber]);
   };

   const handleCancelUpload = () => {
      // Clear the selected document when the user cancels document upload
      setSelectedDocument(null);
   };

   const isUploaded = uploadedDocuments.includes("2");

   return (
      <>
         {selectedDocument ? (
            <div className="flex flex-col gap-4 bg-white dark:bg-gray p-8 rounded-lg md:p-10 shadow-md dark:shadow-md-dark">
               <div
                  onClick={handleCancelUpload}
                  className="w-8 h-8 flex items-center justify-center bg-bubbles dark:bg-mutedGray rounded-md"
               >
                  <FaAngleLeft className="font-light text-lg" />
               </div>

               <h2 className="font-bold">Upload a document</h2>
               <p className="font-medium">
                  You can submit an e-copy of the document
               </p>

               <div className="flex flex-col gap-4">
                  <div
                     // onClick={handleUploadModal}
                     className="h-32 flex flex-col justify-center items-center gap-2 bg-bubbles dark:bg-mutedGray text-xl text-richElectricBlue dark:text-white font-medium rounded cursor-pointer"
                  >
                     <IoCloudUploadOutline className="w-8 h-8" />
                     <p>Upload pdf or image</p>
                  </div>
                  {/* <UploadModal
                     show={modalData.show}
                     title={modalData.title}
                     onClose={handleCloseModal}
                     onConfirm={handleUploadDocument}
                  /> */}
               </div>
            </div>
         ) : (
            <>
               <Hero isNotApprovedHome />

               <div className="flex flex-col gap-4">{/* accordion */}</div>

               <div className="flex flex-col gap-4">
                  <p className="font-semibold text-xl">Action steps</p>

                  <label
                     onClick={() => handleUploadDocument("2")}
                     className={`
                        flex justify-between items-center p-3 bg-white dark:bg-spanishGray dark:text-eerieBlack rounded shadow-md dark:shadow-md-dark cursor-pointer
                     `}
                  >
                     <span className="font-bold">Upload document</span>
                     {isUploaded && (
                        <span className="font-medium">Uploaded</span>
                     )}
                  </label>
               </div>
            </>
         )}
      </>
   );
};

export default NotApprovedHome;
