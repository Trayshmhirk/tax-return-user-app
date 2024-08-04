import { useState } from "react";
import SearchAndFilter from "../components/SearchAndFilter";
import UploadPdfImage from "../components/UploadPdfImage";
import { DocumentsPropTypes } from "../types/DocumentTypes";
import { FileType } from "../types/DocumentTypes";
import { DocumentCard } from "../components/DocumentCard";

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
   const [searchInput, setSearchInput] = useState("");
   const [selectedFilter, setSelectedFilter] = useState("");
   const [activeFilter, setActiveFilter] = useState("All");
   const filterTitleList = ["All", "PDF", "PNG", "DOC", "XLS"];

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
   const mapFileTypeToDocumentType = (fileType: FileType) => {
      const fileTypeMapping: Record<FileType, string> = {
         "application/pdf": "PDF",
         "image/png": "PNG",
         "application/msword": "DOC",
         "image/jpeg": "JPEG",
         "application/vnd.ms-excel": "XLS",

         // Add more mappings as needed
      };
      // Default to the original fileType if no mapping is founda
      return fileTypeMapping[fileType];
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

   const handleSelectedFile = async (
      e: React.ChangeEvent<HTMLInputElement>
   ) => {
      const selectedFiles = Array.from(e.target.files || []);
      console.log(selectedFiles);
   };

   return (
      <div>
         <UploadPdfImage handleFileUpload={handleSelectedFile} />

         {/* Ongoing */}
         <div className="flex flex-col gap-7">
            <div className="flex justify-between items-center text-xl">
               <div className="flex items-center gap-3">
                  <p className="font-medium">Ongoing upload</p>
                  {/* <span>{ongoingUploads ? `(${ongoingUploads})` : "(0)"}</span> */}
               </div>
            </div>
         </div>

         {/*  */}
         <div className="flex flex-col gap-4">
            <div className="title flex justify-between items-center">
               <div className="flex items-center gap-2">
                  <p className="font-medium">Recent upload</p>
                  {/* <span>
                     {documents && documents.length
                        ? `(${documents.length})`
                        : "(0)"}
                  </span> */}
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
