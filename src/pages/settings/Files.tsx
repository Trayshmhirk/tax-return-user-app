import { useEffect, useState } from "react";
import { DocumentsPropTypes, ReceiptsPropTypes } from "@/types/AllTypes";
import { BsFillGridFill } from "react-icons/bs";
import { RiListCheck3 } from "react-icons/ri";
import { IoFolderOpenSharp } from "react-icons/io5";
import { ClipLoader } from "react-spinners";
import { documentColumns } from "@/components/files/documentColumns";
import { receiptColumns } from "@/components/files/receiptColumns";
import { DataTable } from "@/components/files/data-table";
import SearchAndFilter from "@/components/common/SearchAndFilter";
import { DocumentCard } from "@/components/cards/DocumentCard";
import ReceiptCard from "@/components/cards/ReceiptCard";
import { filterByDate } from "@/helpers/filterByDate";
import { filterByDoctype } from "@/helpers/filterByDoctype";
import useWindowWidth from "@/hooks/UseWindowWidth";
import { Button } from "@/components/ui/button";
import { fetchDocuments, fetchReceipts } from "@/api/mockApis";

const Files = () => {
   // Get the window width from the hook
   const windowWidth = useWindowWidth();
   const isbelowXs = windowWidth < 375;

   const [documents, setDocuments] = useState<DocumentsPropTypes[]>([]);
   const [receipts, setReceipts] = useState<ReceiptsPropTypes[]>([]);
   const [loading, setLoading] = useState(false);
   const [isList, setIsList] = useState(false);
   const [searchInput, setSearchInput] = useState("");
   const [selectedFilter, setSelectedFilter] = useState("");
   const [activeFolder, setActiveFolder] = useState<"documents" | "receipts">(
      "documents"
   );
   const docTypeFilterList = ["All", "PDF", "PNG", "JPEG", "DOC", "XLS"];
   const filterTitleList = [
      "All",
      "Today",
      "This week",
      "This month",
      "Earlier",
   ];

   useEffect(() => {
      async function fetchData() {
         setLoading(true);

         setTimeout(async () => {
            const fetchedDocuments = await fetchDocuments();
            const fetchedReceipts = await fetchReceipts();
            setDocuments(fetchedDocuments);
            setReceipts(fetchedReceipts);
            setLoading(false);
         }, 700);
      }
      fetchData();
   }, []);

   const handleToggleGrid = () => {
      setIsList(false);
   };

   const handleToggleList = () => {
      setIsList(true);
   };

   const handleFolderClick = (folder: "documents" | "receipts") => {
      setActiveFolder(folder);
   };

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

   const filteredDocs = documents
      ? documents.filter(
           (doc) => searchDocs(doc) && filterByDoctype(doc, selectedFilter)
        )
      : [];

   const searchReceipts = (receipt: ReceiptsPropTypes) => {
      const docName = receipt.title;
      return docName.toLowerCase().includes(searchInput.toLowerCase());
   };

   const filteredReceipts = receipts
      ? receipts.filter(
           (receipt) =>
              searchReceipts(receipt) && filterByDate(receipt, selectedFilter)
        )
      : [];

   return (
      <>
         <div className="flex justify-between items-center gap-4 mt-[2px]">
            <h1 className="text-lg font-bold">
               Files ({documents.length || receipts.length})
            </h1>

            <div className="flex items-center gap-3">
               <Button
                  onClick={handleToggleGrid}
                  className="w-9 h-9 flex items-center justify-center rounded-full hover-shadow p-0"
               >
                  <BsFillGridFill size={18} />
               </Button>
               <Button
                  onClick={handleToggleList}
                  className="w-9 h-9 flex items-center justify-center rounded-full hover-shadow p-0"
                  disabled={isbelowXs}
               >
                  <RiListCheck3 size={18} />
               </Button>
            </div>
         </div>

         <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 pb-2">
            <div
               onClick={() => handleFolderClick("documents")}
               className="w-full flex flex-col gap-4 bg-white dark:bg-gray p-6 rounded-lg cursor-pointer shadow-md dark:shadow-md-dark hover-shadow-body"
            >
               <div className="flex flex-col items-center text-center gap-3">
                  <IoFolderOpenSharp className="w-8 h-8 text-[#FDBF5E]" />
                  <h6 className="font-medium text-sm">Documents</h6>
               </div>
            </div>

            <div
               onClick={() => handleFolderClick("receipts")}
               className="w-full flex flex-col gap-4 bg-white dark:bg-gray p-6 rounded-lg cursor-pointer shadow-md dark:shadow-md-dark hover-shadow-body"
            >
               <div className="flex flex-col items-center text-center gap-3">
                  <IoFolderOpenSharp className="w-8 h-8 text-[#FDBF5E]" />
                  <h6 className="font-medium text-sm">Receipts</h6>
               </div>
            </div>
         </div>

         <div className="flex flex-col">
            {activeFolder === "documents" && (
               <>
                  {isList ? (
                     <DataTable columns={documentColumns} data={documents} />
                  ) : (
                     <div className="flex flex-col gap-7">
                        <SearchAndFilter
                           handleSearch={handleSearch}
                           handleFilter={handleFilter}
                           title={docTypeFilterList}
                        />

                        {loading ? (
                           <div className="w-full h-20 flex justify-center items-center">
                              <ClipLoader color="#00A2C9" />
                           </div>
                        ) : (
                           <div className="w-full">
                              {filteredDocs.length ? (
                                 <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                                    {filteredDocs.map((doc) => (
                                       <DocumentCard
                                          key={doc.id}
                                          document={doc}
                                       />
                                    ))}
                                 </div>
                              ) : (
                                 <p className="pending-text w-full text-center">
                                    No results found.
                                 </p>
                              )}
                           </div>
                        )}
                     </div>
                  )}
               </>
            )}

            {activeFolder === "receipts" && (
               <>
                  {isList ? (
                     <DataTable
                        columns={receiptColumns}
                        data={receipts}
                        isReceipt
                     />
                  ) : (
                     <div className="flex flex-col gap-7">
                        <SearchAndFilter
                           handleSearch={handleSearch}
                           handleFilter={handleFilter}
                           title={filterTitleList}
                        />

                        {loading ? (
                           <div className="w-full h-20 flex justify-center items-center">
                              <ClipLoader color="#00A2C9" />
                           </div>
                        ) : (
                           <div className="w-full">
                              {filteredReceipts.length ? (
                                 <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                                    {filteredReceipts.map((receipt) => (
                                       <ReceiptCard
                                          key={receipt.id}
                                          receipt={receipt}
                                       />
                                    ))}
                                 </div>
                              ) : (
                                 <p className="pending-text w-full text-center">
                                    No results found.
                                 </p>
                              )}
                           </div>
                        )}
                     </div>
                  )}
               </>
            )}
         </div>
      </>
   );
};

export default Files;
