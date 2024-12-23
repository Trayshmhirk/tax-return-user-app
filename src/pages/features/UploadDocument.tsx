import { useState } from "react";
import SearchAndFilter from "@/components/common/SearchAndFilter";
import UploadPdfImage from "@/components/common/UploadPdfImage";
import { DocumentCard } from "@/components/cards/DocumentCard";
import DocumentTypeIcon from "@/components/icons/DocumentTypeIcon";
import { getBase64 } from "@/helpers/getBase64";
import { mapFileTypeToDocumentType } from "@/helpers/mapFileType";
import { filterByDoctype } from "@/helpers/filterByDoctype";
import { v4 as uuidv4 } from "uuid";
import { ClipLoader } from "react-spinners";
import {
   useDeleteDocsMutation,
   useGetDocsQuery,
   useSetDocsMutation,
} from "@/redux/api/apiSlice";
import PlaceholderText from "@/components/common/PlaceholderText";

const UploadDocument = () => {
   const {
      data: docs = [],
      isLoading,
      // isError,
      // error,
   } = useGetDocsQuery();
   const [setDocs] = useSetDocsMutation();
   const [deleteDocs] = useDeleteDocsMutation();

   const [searchInput, setSearchInput] = useState("");
   const [selectedFilter, setSelectedFilter] = useState("");
   const [ongoingUploads, setOngoingUploads] = useState(0);
   const [uploadProgress, setUploadProgress] = useState(0);
   const [currentFileSize, setCurrentFileSize] = useState(0);
   const [fileSizeInMB, setFileSizeInMB] = useState(0);
   const [selectedFile, setSelectedFile] = useState<File | null>(null);
   const [selectedDocuments, setSelectedDocuments] = useState<
      DocumentsPropTypes[]
   >([]);
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
               const newDocument: DocumentsPropTypes = {
                  id: uuidv4(), // Temporary ID generation
                  document_name: selectedFile.name,
                  document_type: selectedFile.type as FileType,
                  document_size: fileSizeInMB.toString(),
                  date_modified: currentDate,
                  base64: base64File, // You can store this if needed for later use
               };

               setDocs(newDocument);

               // Reset upload progress after 2 seconds
               setTimeout(() => {
                  setUploadProgress(0);

                  // Decrement ongoing uploads when a file upload ends
                  setOngoingUploads(
                     (prevOngoingUploads) => prevOngoingUploads - 1
                  );
               }, 2000);
            },
            (totalSimulationSteps + 1) * simulationInterval
         );
      }
   };

   const filteredDocs = docs
      ? docs
           .filter(
              (doc) => searchDocs(doc) && filterByDoctype(doc, selectedFilter)
           )
           .sort(
              (a, b) =>
                 new Date(b.date_modified).getTime() -
                 new Date(a.date_modified).getTime()
           ) // Sorting by latest date
      : [];

   // Check if all filtered documents are selected
   const allDocumentsSelected =
      filteredDocs.length > 0 &&
      filteredDocs.every((doc) =>
         selectedDocuments.some((selectedDoc) => selectedDoc.id === doc.id)
      );

   const handleSelectAll = () => {
      if (allDocumentsSelected) {
         // Deselect all
         setSelectedDocuments([]);
      } else {
         // Select all documents
         setSelectedDocuments(filteredDocs); // `filteredDocs` represents the currently filtered documents.
      }
   };

   const handleSelectDocument = (doc: DocumentsPropTypes) => {
      setSelectedDocuments((prevSelected) => {
         // Check if the document is already selected
         if (prevSelected.find((selectedDoc) => selectedDoc.id === doc.id)) {
            // Deselect the document
            return prevSelected.filter(
               (selectedDoc) => selectedDoc.id !== doc.id
            );
         } else {
            // Select the document (add it to the list)
            return [...prevSelected, doc];
         }
      });
   };

   const handleDeleteDocument = (docId: string) => {
      deleteDocs({ id: docId });

      // Also remove it from the selectedDocuments state if it's selected
      setSelectedDocuments((prevSelectedDocs) =>
         prevSelectedDocs.filter((doc) => doc.id !== docId)
      );
   };

   return (
      <div className="flex flex-col gap-7">
         <UploadPdfImage handleFileUpload={handleSelectedFile} />

         {/* Ongoing */}
         <div className="flex flex-col gap-4 bg-white dark:bg-gray p-4 rounded shadow-md dark:shadow-md-dark ">
            <div className="flex justify-between items-center">
               <div className="flex items-center gap-2">
                  <p className="font-medium">Ongoing uploads</p>
                  <span>{ongoingUploads ? `(${ongoingUploads})` : "(0)"}</span>
               </div>
            </div>
            <div className="block w-full h-[1px] bg-mutedGray dark:bg-white opacity-30" />
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
               <PlaceholderText
                  isPendingUpload
                  text="You do not have any pending uploads. Click on the upload
                  section above to begin the process."
               />
            )}
         </div>

         <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
               <div className="flex items-center gap-2">
                  <p className="font-medium">Recent uploads</p>
                  <span>
                     {docs && docs.length ? `(${docs.length})` : "(0)"}
                  </span>
               </div>

               <div className="flex justify-between items-center gap-1 text-richElectricBlue font-medium">
                  <span className="cursor-pointer" onClick={handleSelectAll}>
                     {allDocumentsSelected ? "Deselect All" : "Select All"}
                  </span>
                  <span>{` (${selectedDocuments.length})`}</span>
               </div>
            </div>

            <SearchAndFilter
               handleSearch={handleSearch}
               handleFilter={handleFilter}
               title={docTypeFilterList}
            />

            {isLoading ? (
               <div className="w-full h-20 flex justify-center items-center">
                  <ClipLoader color="#00A2C9" />
               </div>
            ) : (
               <div className="w-full">
                  {filteredDocs.length !== 0 ? (
                     <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {filteredDocs.map((doc) => (
                           <DocumentCard
                              key={doc.id}
                              document={doc}
                              onSelect={handleSelectDocument}
                              isSelected={selectedDocuments.some(
                                 (selectedDoc) => selectedDoc.id === doc.id
                              )}
                              handleDeleteDocument={handleDeleteDocument}
                           />
                        ))}
                     </div>
                  ) : (
                     <PlaceholderText text="No documents found." />
                  )}
               </div>
            )}
         </div>
      </div>
   );
};

export default UploadDocument;
