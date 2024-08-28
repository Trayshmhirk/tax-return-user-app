import { useState } from "react";
import SearchAndFilter from "@/components/common/SearchAndFilter";
import { DocumentsPropTypes } from "@/types/AllTypes";
import { mapFileTypeToDocumentType } from "@/helpers/mapFileType";
import { BsFillGridFill } from "react-icons/bs";
import { RiListCheck3 } from "react-icons/ri";

const MyFiles = () => {
   const [searchInput, setSearchInput] = useState("");
   const [selectedFilter, setSelectedFilter] = useState("");
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

   const filterByDoctype = (doc: DocumentsPropTypes) => {
      if (selectedFilter === "" || selectedFilter === "All") {
         // if no filter is selected, all users should be included
         return true;
      }
      return mapFileTypeToDocumentType(doc.document_type) === selectedFilter;
   };

   searchDocs;
   filterByDoctype;

   return (
      <>
         <div className="flex justify-between items-center gap-4">
            <h1 className="text-lg font-semibold">Files (20)</h1>

            <div className="flex items-center gap-3">
               <button className="w-9 h-9 flex items-center justify-center bg-brightGray dark:bg-mutedGray rounded-full hover-shadow">
                  <BsFillGridFill size={18} />
               </button>
               <button className="w-9 h-9 flex items-center justify-center bg-brightGray dark:bg-mutedGray rounded-full hover-shadow">
                  <RiListCheck3 size={18} />
               </button>
            </div>
         </div>

         <div className="">
            <div className="flex justify-between items-center">
               <SearchAndFilter
                  handleSearch={handleSearch}
                  handleFilter={handleFilter}
                  title={filterTitleList}
               />
            </div>
         </div>
      </>
   );
};

export default MyFiles;
