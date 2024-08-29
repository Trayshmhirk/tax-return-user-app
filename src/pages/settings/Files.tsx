import { useEffect, useState } from "react";
import { DocumentsPropTypes } from "@/types/AllTypes";
import { BsFillGridFill } from "react-icons/bs";
import { RiListCheck3 } from "react-icons/ri";
import { ClipLoader } from "react-spinners";
import { columns } from "../../components/files/columns";
import { DataTable } from "@/components/files/data-table";
import SearchAndFilter from "@/components/common/SearchAndFilter";
import { mapFileTypeToDocumentType } from "@/helpers/mapFileType";
import { DocumentCard } from "@/components/cards/DocumentCard";

async function fetchDocumentsForCard(): Promise<DocumentsPropTypes[]> {
   return [
      {
         id: "id1",
         document_name: "Document pdf",
         document_size: "10",
         document_type: "application/pdf",
         date_modified: "2024-08-01",
         base64: "",
      },
      {
         id: "id2",
         document_name: "document",
         document_size: "25",
         document_type: "image/png",
         date_modified: "2024-08-05",
         base64: "",
      },
      {
         id: "id5",
         document_name: "document image",
         document_size: "5",
         document_type: "image/jpeg",
         date_modified: "2024-08-29",
         base64: "",
      },
      {
         id: "id3",
         document_name: "Excel file",
         document_size: "20",
         document_type: "application/vnd.ms-excel",
         date_modified: "2024-08-10",
         base64: "",
      },
      {
         id: "id4",
         document_name: "Word file",
         document_size: "20",
         document_type: "application/msword",
         date_modified: "2024-08-25",
         base64: "",
      },
   ];
}

const Files = () => {
   const [data, setData] = useState<DocumentsPropTypes[]>([]);
   const [loading, setLoading] = useState(false);
   const [isList, setIsList] = useState(false);
   const [isGrid, setIsGrid] = useState(true);
   const [searchInput, setSearchInput] = useState("");
   const [selectedFilter, setSelectedFilter] = useState("");
   const docTypeFilterList = ["All", "PDF", "PNG", "JPEG", "DOC", "XLS"];

   useEffect(() => {
      async function fetchData() {
         setLoading(true);

         setTimeout(async () => {
            const documents = await fetchDocumentsForCard(); // Fetch the data
            setData(documents);
            setLoading(false);
         }, 300);
      }

      fetchData();
   }, []);

   const handleToggleGrid = () => {
      setIsGrid(true);
      setIsList(false);
   };

   const handleToggleList = () => {
      setIsList(true);
      setIsGrid(false);
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

   const filterByDoctype = (doc: DocumentsPropTypes) => {
      if (selectedFilter === "" || selectedFilter === "All") {
         // if no filter is selected, all users should be included
         return true;
      }
      return mapFileTypeToDocumentType(doc.document_type) === selectedFilter;
   };

   const filteredDocs = data
      ? data.filter((doc) => searchDocs(doc) && filterByDoctype(doc))
      : [];

   filteredDocs;

   return (
      <>
         <div className="flex justify-between items-center gap-4">
            <h1 className="text-lg font-semibold">Files ({data.length})</h1>

            <div className="flex items-center gap-3">
               <button
                  onClick={handleToggleGrid}
                  className="w-9 h-9 flex items-center justify-center bg-richElectricBlue text-white rounded-full hover-shadow"
               >
                  <BsFillGridFill size={18} />
               </button>
               <button
                  onClick={handleToggleList}
                  className="w-9 h-9 flex items-center justify-center bg-richElectricBlue text-white rounded-full disabled:bg-spanishGray disabled:opacity-70 hover-shadow"
                  disabled={window.innerWidth < 768}
               >
                  <RiListCheck3 size={18} />
               </button>
            </div>
         </div>

         <div className="flex flex-col">
            {isList && (
               <div className="">
                  {loading ? (
                     <div className="w-full h-20 flex justify-center items-center">
                        <ClipLoader color="#00A2C9" />
                     </div>
                  ) : (
                     <DataTable columns={columns} data={data} />
                  )}
               </div>
            )}
            {isGrid && (
               <div className="flex flex-col gap-7">
                  {loading ? (
                     <div className="w-full h-20 flex justify-center items-center">
                        <ClipLoader color="#00A2C9" />
                     </div>
                  ) : (
                     <>
                        <SearchAndFilter
                           handleSearch={handleSearch}
                           handleFilter={handleFilter}
                           title={docTypeFilterList}
                        />

                        <div className="w-full">
                           {filteredDocs.length ? (
                              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                 {filteredDocs.map((doc) => (
                                    <DocumentCard key={doc.id} document={doc} />
                                 ))}
                              </div>
                           ) : (
                              <p className="pending-text w-full text-center">
                                 No results found.
                              </p>
                           )}
                        </div>
                     </>
                  )}
               </div>
            )}
         </div>
      </>
   );
};

export default Files;
