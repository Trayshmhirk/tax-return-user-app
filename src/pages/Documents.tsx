import { useNavigate } from "react-router-dom";
import UploadPdfImage from "../components/UploadPdfImage";
import SearchAndFilter from "../components/SearchAndFilter";
import { useState } from "react";

type FileType = {
   "application/pdf": string;
   "image/png": string;
};

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

   const [searchInput, setSearchInput] = useState("");
   const [selectedFilter, setSelectedFilter] = useState("");
   const [activeFilter, setActiveFilter] = useState("All");
   const filterTitleList = ["All", "PDF", "PNG", "DOC", "XLS"];

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
   };

   const searchDocs = (doc) => {
      const docName = doc.title;
      return docName.toLowerCase().includes(searchInput.toLowerCase());
   };

   const handleFilter = (title: string) => {
      setSelectedFilter(title);
   };

   // Map file types to document types
   const mapFileTypeToDocumentType = (fileType: FileType) => {
      const fileTypeMapping = {
         "application/pdf": "PDF",
         "image/png": "PNG",
         // Add more mappings as needed
      };
      // Default to the original fileType if no mapping is founda
      return fileTypeMapping[fileType] || fileType;
   };

   const filterByDoctype = (doc) => {
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

            <SearchAndFilter
               handleSearch={handleSearch}
               handleFilter={handleFilter}
               activeFilter={activeFilter}
               setActiveFilter={setActiveFilter}
               title={filterTitleList}
            />

            <div className="w-full flex flex-wrap gap-4">
               {filteredDocs.length ? (
                  <>
                     {filteredDocs.map((doc) => (
                        <>{doc}</>
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
