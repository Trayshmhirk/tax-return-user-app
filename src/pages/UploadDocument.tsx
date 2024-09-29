import { useState } from "react";
import SearchAndFilter from "../components/common/SearchAndFilter";
import UploadPdfImage from "../components/common/UploadPdfImage";
import { DocumentCard } from "../components/cards/DocumentCard";
import DocumentTypeIcon from "../components/icons/DocumentTypeIcon";
import { DocumentsPropTypes, FileType } from "../types/AllTypes";
import { uploadedDocuments as mockUploadedDocuments } from "../mocks/AllMockData";
import { getBase64 } from "../helpers/getBase64";
import { mapFileTypeToDocumentType } from "../helpers/mapFileType";
import { filterByDoctype } from "@/helpers/filterByDoctype";

const UploadDocument = () => {
   const [searchInput, setSearchInput] = useState<string>("");
   const [selectedFilter, setSelectedFilter] = useState<string>("");
   const [ongoingUploads, setOngoingUploads] = useState<number>(0);
   const [uploadProgress, setUploadProgress] = useState<number>(0);
   const [currentFileSize, setCurrentFileSize] = useState<number>(0);
   const [fileSizeInMB, setFileSizeInMB] = useState<number>(0);
   const [selectedFile, setSelectedFile] = useState<File | null>(null);
   const [uploadedDocuments, setUploadedDocuments] = useState<
      DocumentsPropTypes[]
   >(mockUploadedDocuments); // State to hold uploaded docs
   const docTypeFilterList = ["All", "PDF", "PNG", "JPEG", "DOC", "XLS"];

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
   };

   const searchDocs = (doc: DocumentsPropTypes) => {
      const docName = doc.document_name;
      return docName.toLowerCase().includes(searchInput.toLowerCase());
   };

   const handleFilter = (title: string) => {
      setSelectedFilter(title);
   };

   const handleSelectedFile = async (
      e: React.ChangeEvent<HTMLInputElement>
   ) => {
      const selectedFiles = Array.from(e.target.files || []);

      for (let index = 0; index < selectedFiles.length; index++) {
         const selectedFile = selectedFiles[index];
         const base64File = await getBase64(selectedFile);

         console.log(selectedFile.type);

         // Check if base64File is a string and handle the null case
         if (typeof base64File !== "string") {
            console.error("Failed to convert file to base64");
            return;
         }

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

         // Convert current date to ISO date string
         const currentDate = new Date().toISOString();

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

               // Add uploaded document to the state
               // Map the file's type to your FileType enum or union
               // Ensure selectedFile.type is a valid FileType

               const newDocument: DocumentsPropTypes = {
                  id: Math.random().toString(), // Temporary ID generation
                  document_name: selectedFile.name,
                  document_type: selectedFile.type as FileType,
                  document_size: fileSizeInMB.toString(),
                  date_modified: currentDate,
                  base64: base64File, // You can store this if needed for later use
               };

               // Add the new document
               setUploadedDocuments((prevDocs) => [...prevDocs, newDocument]);

               // Reset upload progress after 5 seconds
               setTimeout(() => {
                  setUploadProgress(0);

                  // Decrement ongoing uploads when a file upload ends
                  setOngoingUploads(
                     (prevOngoingUploads) => prevOngoingUploads - 1
                  );
               }, 3000);
            },
            (totalSimulationSteps + 1) * simulationInterval
         );
      }
   };

   const filteredFiles = uploadedDocuments
      ? uploadedDocuments
           .filter(
              (doc) => searchDocs(doc) && filterByDoctype(doc, selectedFilter)
           )
           .sort(
              (a, b) =>
                 new Date(b.date_modified).getTime() -
                 new Date(a.date_modified).getTime()
           ) // Sorting by latest date
      : [];

   return (
      <div className="flex flex-col gap-9">
         <UploadPdfImage handleFileUpload={handleSelectedFile} />

         {/* Ongoing */}
         <div className="flex flex-col gap-5 bg-white dark:bg-gray p-4 rounded shadow-md dark:shadow-md-dark ">
            <div className="flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <p className="font-medium">Ongoing upload</p>
                  <span>{ongoingUploads ? `(${ongoingUploads})` : "(0)"}</span>
               </div>
            </div>
            <div className="block w-full h-[1px] bg-mutedGray dark:bg-white opacity-40" />
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
         <div className="flex flex-col gap-7">
            <div className="title flex justify-between items-center">
               <div className="flex items-center gap-2">
                  <p className="font-medium">Recent upload</p>
                  <span>
                     {uploadedDocuments && uploadedDocuments.length
                        ? `(${uploadedDocuments.length})`
                        : "(0)"}
                  </span>
               </div>

               <span className="text-richElectricBlue">Select</span>
            </div>

            <SearchAndFilter
               handleSearch={handleSearch}
               handleFilter={handleFilter}
               title={docTypeFilterList}
            />

            <div className="w-full">
               {filteredFiles.length ? (
                  <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                     {filteredFiles.map((doc) => (
                        <DocumentCard key={doc.id} document={doc} />
                     ))}
                  </div>
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
