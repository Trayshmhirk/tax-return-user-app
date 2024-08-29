import { useEffect, useState } from "react";
import { DocumentsPropTypes } from "@/types/AllTypes";
import { BsFillGridFill } from "react-icons/bs";
import { RiListCheck3 } from "react-icons/ri";
import { ClipLoader } from "react-spinners";
import { columns } from "../../components/files/columns";
import { DataTable } from "@/components/files/data-table";

async function fetchDocumentsForCard(): Promise<DocumentsPropTypes[]> {
   return [
      {
         id: "id1",
         document_name: "Document 1adfuubadfdajhjahdf",
         document_size: "10",
         document_type: "application/pdf",
         date_modified: "2024-08-01",
      },

      {
         id: "id3",
         document_name: "Excel file",
         document_size: "20",
         document_type: "application/vnd.ms-excel",
         date_modified: "2024-08-10",
      },
      {
         id: "id4",
         document_name: "Word file",
         document_size: "20",
         document_type: "application/msword",
         date_modified: "2024-08-25",
      },
      {
         id: "id2",
         document_name: "document",
         document_size: "25",
         document_type: "image/png",
         date_modified: "2024-08-05",
      },
   ];
}

const Files = () => {
   const [data, setData] = useState<DocumentsPropTypes[]>([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      async function fetchData() {
         // setLoading(true);

         setTimeout(async () => {
            const documents = await fetchDocumentsForCard(); // Fetch the data
            setData(documents);
            setLoading(false);
         }, 300);
      }

      fetchData();
   }, []);

   return (
      <>
         <div className="flex justify-between items-center gap-4">
            <h1 className="text-lg font-semibold">Files ({data.length})</h1>

            <div className="flex items-center gap-3">
               <button className="w-9 h-9 flex items-center justify-center bg-richElectricBlue text-white rounded-full hover-shadow">
                  <BsFillGridFill size={18} />
               </button>
               <button className="w-9 h-9 flex items-center justify-center bg-richElectricBlue text-white rounded-full hover-shadow">
                  <RiListCheck3 size={18} />
               </button>
            </div>
         </div>

         <div className="flex flex-col gap-6">
            <div className="">
               {loading ? (
                  <div className="w-full h-20 flex justify-center items-center">
                     <ClipLoader color="#00A2C9" />
                  </div>
               ) : (
                  <DataTable columns={columns} data={data} />
               )}
            </div>
         </div>
      </>
   );
};

export default Files;
