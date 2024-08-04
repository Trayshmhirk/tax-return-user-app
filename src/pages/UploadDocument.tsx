import { useState } from "react";
import SearchAndFilter from "../components/SearchAndFilter";
import UploadPdfImage from "../components/UploadPdfImage";
import { DocumentsPropTypes } from "../types/DocumentTypes";
import { FileType } from "../types/DocumentTypes";
import { DocumentCard } from "../components/DocumentCard";
import DocumentTypeIcon from "../components/DocumentTypeIcon";

const documents: DocumentsPropTypes[] = [
   {
      id: "id1",
      title: "Document 1adfuubadfdajhjahdf",
      document_size: "20",
      document_type: "application/pdf",
   },
   {
      id: "id2",
      title: "document",
      document_size: "20",
      document_type: "image/png",
   },
   {
      id: "id3",
      title: "Excel file",
      document_size: "20",
      document_type: "application/vnd.ms-excel",
   },
   {
      id: "id4",
      title: "Word file",
      document_size: "20",
      document_type: "application/msword",
   },
];

const UploadDocument = () => {
   const [searchInput, setSearchInput] = useState<string>("");
   const [selectedFilter, setSelectedFilter] = useState<string>("");
   const [activeFilter, setActiveFilter] = useState<string>("All");
   const filterTitleList = ["All", "PDF", "PNG", "DOC", "XLS"];
   const [ongoingUploads, setOngoingUploads] = useState<number>(0);
   const [uploadProgress, setUploadProgress] = useState<number>(0);
   const [currentFileSize, setCurrentFileSize] = useState<number>(0);
   const [fileSizeInMB, setFileSizeInMB] = useState<number>(0);
   const [selectedFile, setSelectedFile] = useState<File | null>(null);

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
   };

   const searchDocs = (doc: DocumentsPropTypes) => {
      const docName = doc.title;
      return docName.toLowerCase().includes(searchInput.toLowerCase());
   };

   const handleFilter = (title: string) => {
      setSelectedFilter(title);
   };

   // Map file types to document types
   const mapFileTypeToDocumentType = (fileType: FileType): string => {
      const fileTypeMapping: Record<FileType, string> = {
         "application/pdf": "PDF",
         "image/png": "PNG",
         "application/msword": "DOC",
         "image/jpeg": "JPEG",
         "application/vnd.ms-excel": "XLS",

         // Add more mappings as needed
      };
      // Default to the original fileType if no mapping is founda
      return fileTypeMapping[fileType] || fileType;
   };

   const filterByDoctype = (doc: DocumentsPropTypes) => {
      if (selectedFilter === "" || selectedFilter === "All") {
         // if no filter is selected, all users should be included
         return true;
      }
      return mapFileTypeToDocumentType(doc.document_type) === selectedFilter;
   };

   const filteredFiles = documents
      ? documents.filter((doc) => searchDocs(doc) && filterByDoctype(doc))
      : [];

   function getBase64(file: File): Promise<string | ArrayBuffer | null> {
      return new Promise((resolve, reject) => {
         const reader = new FileReader();
         reader.readAsDataURL(file);
         reader.onload = () => resolve(reader.result);
         reader.onerror = (error) => reject(error);
      });
   }

   const handleSelectedFile = async (
      e: React.ChangeEvent<HTMLInputElement>
   ) => {
      const selectedFiles = Array.from(e.target.files || []);
      console.log(selectedFiles);

      for (let index = 0; index < selectedFiles.length; index++) {
         const selectedFile = selectedFiles[index];
         const base64File = await getBase64(selectedFile);

         console.log(base64File);

         setSelectedFile(selectedFile);

         // in megabytes
         const fileSizeInBytes = selectedFile.size;
         const fileSizeInMB = parseFloat(
            (fileSizeInBytes / (1024 * 1024)).toFixed(2)
         );
         setFileSizeInMB(fileSizeInMB);

         // Increment ongoing uploads when a file upload starts
         setOngoingUploads((prevOngoingUploads) => prevOngoingUploads + 1);

         // Simulate file upload progress
         const simulationInterval = 500; // in milliseconds
         const totalSimulationSteps = 5;

         for (let step = 1; step <= totalSimulationSteps; step++) {
            setTimeout(() => {
               const progress = (step / totalSimulationSteps) * 100;
               setUploadProgress(parseFloat(progress.toFixed(1)));

               // Calculate current file size based on progress
               const currentProgressFileSize =
                  (progress / 100) * fileSizeInBytes;
               setCurrentFileSize(
                  parseFloat(
                     (currentProgressFileSize / (1024 * 1024)).toFixed(2)
                  )
               );
            }, step * simulationInterval);
         }

         // Simulate file upload completion and set the file to the state
         setTimeout(
            async () => {
               // const { email, token } = userProfile;

               // try {
               //    const uploadResponse = await api.post(
               //       "/upload-document",
               //       {
               //          document_name: selectedFile.name,
               //          document: base64File, // Pass base64 file here
               //          size: fileSizeInMB, // Pass document size here
               //          type: selectedFile.type, // Pass document type here
               //       },
               //       {
               //          headers: {
               //             useremail: email,
               //             usertoken: token,
               //          },
               //       }
               //    );

               //    // If upload is successful, add the new document to the Redux state
               //    if (uploadResponse.status === 200) {
               //       // Optionally fetch the updated list of documents from the server
               //       const updatedDocuments = await getDocs(email, token);
               //       dispatch(setDocuments(updatedDocuments.data.documents));
               //    }

               //    // Handle successful response here
               // } catch (error) {
               //    console.error("API Error:", error);
               //    // Handle error, log it, or display a user-friendly message
               // }

               // Reset upload progress after 5 seconds
               setTimeout(() => {
                  setUploadProgress(0);

                  // Decrement ongoing uploads when a file upload ends
                  setOngoingUploads(
                     (prevOngoingUploads) => prevOngoingUploads - 1
                  );
               }, 7000);
            },
            (totalSimulationSteps + 1) * simulationInterval
         );
      }
   };

   return (
      <div className="flex flex-col gap-9">
         <UploadPdfImage handleFileUpload={handleSelectedFile} />

         {/* Ongoing */}
         <div className="flex flex-col gap-4 p-4 rounded shadow-md dark:shadow-md-dark md:p-0 md:rounded-none md:shadow-none md:dark:shadow-none">
            <div className="flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <p className="font-medium">Ongoing upload</p>
                  <span>{ongoingUploads ? `(${ongoingUploads})` : "(0)"}</span>
               </div>
            </div>
            <div className="block w-full h-[1px] bg-eerieBlack dark:bg-white opacity-40 md:hidden" />
            {uploadProgress > 0 ? (
               <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                     <DocumentTypeIcon
                        docType={mapFileTypeToDocumentType(
                           selectedFile!.type as FileType
                        )}
                     />
                     <p className="doc-name">{selectedFile!.name}</p>
                  </div>

                  <div className="w-full h-1 bg-spanishGray rounded-md">
                     <div
                        className="h-1 bg-richElectricBlue rounded-md"
                        style={{ width: `${uploadProgress}%` }}
                     ></div>
                  </div>

                  <div className="flex justify-between">
                     <div className="text-xs text-mutedGray dark:text-white">{`${currentFileSize} of ${fileSizeInMB}mb`}</div>
                     <div className="text-richElectricBlue text-xs">{`${uploadProgress === 100 ? "Uploaded" : "Uploading..."}`}</div>
                  </div>
               </div>
            ) : (
               <p className="pending-text text-center">
                  You do not have any pending uploads. Click on the upload
                  section above to begin the process.
               </p>
            )}
         </div>

         {/*  */}
         <div className="flex flex-col gap-4">
            <div className="title flex justify-between items-center">
               <div className="flex items-center gap-2">
                  <p className="font-medium">Recent upload</p>
                  <span>
                     {documents && documents.length
                        ? `(${documents.length})`
                        : "(0)"}
                  </span>
               </div>

               <span className="text-richElectricBlue">Select</span>
            </div>

            <SearchAndFilter
               handleSearch={handleSearch}
               handleFilter={handleFilter}
               activeFilter={activeFilter}
               setActiveFilter={setActiveFilter}
               title={filterTitleList}
            />

            <div className="w-full flex flex-wrap gap-5">
               {filteredFiles.length ? (
                  <>
                     {filteredFiles.map((doc) => (
                        <DocumentCard
                           key={doc.id}
                           docId={doc.id}
                           documentName={doc.title}
                           documentSize={doc.document_size}
                           documentType={doc.document_type}
                        />
                     ))}
                  </>
               ) : (
                  <p className="pending-text w-100 text-center">
                     Nothing to show here.
                  </p>
               )}
            </div>
         </div>
      </div>
   );
};

export default UploadDocument;
