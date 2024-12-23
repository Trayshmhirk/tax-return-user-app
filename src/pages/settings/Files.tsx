import { useState } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { RiListCheck3 } from "react-icons/ri";
import { IoFolderOpenSharp } from "react-icons/io5";
import { ClipLoader } from "react-spinners";
import { documentColumns } from "@/components/files/documentColumns";
import { invoiceColumns } from "@/components/files/invoiceColumns";
import { DataTable } from "@/components/files/data-table";
import SearchAndFilter from "@/components/common/SearchAndFilter";
import { DocumentCard } from "@/components/cards/DocumentCard";
import InvoiceCard from "@/components/cards/InvoiceCard";
import { filterByDoctype } from "@/helpers/filterByDoctype";
import useWindowWidth from "@/hooks/useWindowWidth";
import { Button } from "@/components/ui/button";
import {
   useDeleteDocsMutation,
   useDeleteInvoiceMutation,
   useGetDocsQuery,
   useGetInvoicesQuery,
} from "@/redux/api/apiSlice";
import PlaceholderText from "@/components/common/PlaceholderText";

const Files = () => {
   // Get the window width from the hook
   const windowWidth = useWindowWidth();
   const isbelowXs = windowWidth < 375;

   const {
      data: docs = [],
      isLoading,
      // isError,
      // error,
   } = useGetDocsQuery();
   const [deleteDocs] = useDeleteDocsMutation();

   const { data: invoices = [], isLoading: isLoadingInvoices } =
      useGetInvoicesQuery();
   const [deleteInvoice] = useDeleteInvoiceMutation();

   const [selectedDocuments, setSelectedDocuments] = useState<
      DocumentsPropTypes[]
   >([]);
   const [isList, setIsList] = useState(false);
   const [searchInput, setSearchInput] = useState("");
   const [selectedFilter, setSelectedFilter] = useState("");
   const [activeFolder, setActiveFolder] = useState<"documents" | "invoices">(
      "documents"
   );
   const docTypeFilterList = ["All", "PDF", "PNG", "JPEG", "DOC", "XLS"];
   const filterTitleList = ["All", "Pending", "Paid", "Overdue", "Failed"];

   const handleToggleGrid = () => {
      setIsList(false);
   };

   const handleToggleList = () => {
      setIsList(true);
   };

   const handleFolderClick = (folder: "documents" | "invoices") => {
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
         setSelectedDocuments(filteredDocs);
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

   // invoice functions
   const searchInvoices = (invoice: InvoicesPropTypes) => {
      const docName = invoice.title;
      return docName.toLowerCase().includes(searchInput.toLowerCase());
   };

   const filterByStatus = (invoice: InvoicesPropTypes) => {
      if (selectedFilter === "" || selectedFilter === "All") {
         // if no filter is selected, all users should be included
         return true;
      }
      return invoice.status.toLowerCase() === selectedFilter.toLowerCase();
   };

   const filteredInvoices = invoices
      ? invoices.filter(
           (invoice) => searchInvoices(invoice) && filterByStatus(invoice)
        )
      : [];

   const handleDeleteInvoice = (invoiceId: string) => {
      deleteInvoice({ id: invoiceId });
   };

   return (
      <>
         <div className="flex justify-between items-center gap-4 mt-[2px]">
            <h1 className="text-lg font-bold">
               Files ({docs.length || invoices.length})
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
               onClick={() => handleFolderClick("invoices")}
               className="w-full flex flex-col gap-4 bg-white dark:bg-gray p-6 rounded-lg cursor-pointer shadow-md dark:shadow-md-dark hover-shadow-body"
            >
               <div className="flex flex-col items-center text-center gap-3">
                  <IoFolderOpenSharp className="w-8 h-8 text-[#FDBF5E]" />
                  <h6 className="font-medium text-sm">Invoices</h6>
               </div>
            </div>
         </div>

         <div className="flex flex-col">
            {activeFolder === "documents" && (
               <>
                  {isList ? (
                     <div className="flex flex-col gap-6">
                        <div className="flex justify-between items-center">
                           <div className="flex items-center gap-2">
                              <p className="font-medium">Recent documents</p>
                              <span>
                                 {docs && docs.length
                                    ? `(${docs.length})`
                                    : "(0)"}
                              </span>
                           </div>
                        </div>
                        <DataTable
                           columns={documentColumns(handleDeleteDocument)}
                           data={docs}
                        />
                     </div>
                  ) : (
                     <div className="flex flex-col gap-6">
                        <div className="flex justify-between items-center">
                           <div className="flex items-center gap-2">
                              <p className="font-medium">Recent documents</p>
                              <span>
                                 {docs && docs.length
                                    ? `(${docs.length})`
                                    : "(0)"}
                              </span>
                           </div>

                           <div className="flex justify-between items-center gap-1 text-richElectricBlue font-medium">
                              <span
                                 className="cursor-pointer"
                                 onClick={handleSelectAll}
                              >
                                 {allDocumentsSelected
                                    ? "Deselect All"
                                    : "Select All"}
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
                                 <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                                    {filteredDocs.map((doc) => (
                                       <DocumentCard
                                          key={doc.id}
                                          document={doc}
                                          onSelect={handleSelectDocument}
                                          isSelected={selectedDocuments.some(
                                             (selectedDoc) =>
                                                selectedDoc.id === doc.id
                                          )}
                                          handleDeleteDocument={
                                             handleDeleteDocument
                                          }
                                       />
                                    ))}
                                 </div>
                              ) : (
                                 <PlaceholderText text="No documents found." />
                              )}
                           </div>
                        )}
                     </div>
                  )}
               </>
            )}

            {activeFolder === "invoices" && (
               <>
                  {isList ? (
                     <div className="flex flex-col gap-6">
                        <div className="flex justify-between items-center">
                           <div className="flex items-center gap-2">
                              <p className="font-medium">Recent invoices</p>
                              <span>
                                 {invoices && invoices.length
                                    ? `(${invoices.length})`
                                    : "(0)"}
                              </span>
                           </div>
                        </div>
                        <DataTable
                           columns={invoiceColumns(handleDeleteInvoice)}
                           data={invoices}
                           isInvoice
                        />
                     </div>
                  ) : (
                     <div className="flex flex-col gap-6">
                        <div className="flex justify-between items-center">
                           <div className="flex items-center gap-2">
                              <p className="font-medium">Recent invoices</p>
                              <span>
                                 {invoices && invoices.length
                                    ? `(${invoices.length})`
                                    : "(0)"}
                              </span>
                           </div>
                        </div>

                        <SearchAndFilter
                           handleSearch={handleSearch}
                           handleFilter={handleFilter}
                           title={filterTitleList}
                        />

                        {isLoadingInvoices ? (
                           <div className="w-full h-20 flex justify-center items-center">
                              <ClipLoader color="#00A2C9" />
                           </div>
                        ) : (
                           <div className="w-full">
                              {filteredInvoices.length !== 0 ? (
                                 <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                    {filteredInvoices.map((invoice) => (
                                       <InvoiceCard
                                          key={invoice.id}
                                          invoice={invoice}
                                          handleDeleteInvoice={
                                             handleDeleteInvoice
                                          }
                                       />
                                    ))}
                                 </div>
                              ) : (
                                 <PlaceholderText text="No invoices found." />
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
