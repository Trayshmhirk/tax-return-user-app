import { useNavigate } from "react-router-dom";
import UploadPdfImage from "../components/common/UploadPdfImage";
import SearchAndFilter from "../components/common/SearchAndFilter";
import React, { useState } from "react";
import { DocumentCard } from "../components/cards/DocumentCard";
import { DocumentsPropTypes, FileType } from "../types/AllTypes";
import { uploadedDocuments } from "../mocks/AllMockData";

const Documents = () => {
   const navigate = useNavigate();

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

   const filteredDocs = uploadedDocuments
      ? uploadedDocuments.filter(
           (doc) => searchDocs(doc) && filterByDoctype(doc)
        )
      : [];

   const handleNavigateUploadDocument = () => {
      navigate("/upload-document");
   };

   return (
      <div className="flex flex-col gap-9">
         <UploadPdfImage
            isUploadDoc
            handleClick={handleNavigateUploadDocument}
         />

         <div className="flex flex-col gap-7">
            <div className="flex items-center gap-2 text-xl">
               <p className="font-medium">Uploaded documents</p>

               <span className="fw-normal ">
                  {uploadedDocuments && uploadedDocuments.length
                     ? `(${uploadedDocuments.length})`
                     : "(0)"}
               </span>
            </div>

            <SearchAndFilter
               handleSearch={handleSearch}
               handleFilter={handleFilter}
               activeFilter={activeFilter}
               setActiveFilter={setActiveFilter}
               title={filterTitleList}
            />

            <div className="w-full flex flex-wrap gap-5">
               {filteredDocs.length ? (
                  <>
                     {filteredDocs.map((doc) => (
                        <React.Fragment key={doc.id}>
                           <DocumentCard
                              docId={doc.id}
                              documentName={doc.title}
                              documentSize={doc.document_size}
                              documentType={doc.document_type}
                              // document={doc}
                           />
                        </React.Fragment>
                     ))}
                  </>
               ) : (
                  <p className="pending-text w-full text-center">
                     No results found.
                  </p>
               )}
            </div>
         </div>
      </div>
   );
};

export default Documents;
