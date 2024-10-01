import { useEffect, useState } from "react";
import SearchAndFilter from "../components/common/SearchAndFilter";
import UploadPdfImage from "../components/common/UploadPdfImage";
import ReceiptCard from "../components/cards/InvoiceCard";
import { InvoicesPropTypes } from "../types/AllTypes";
import { getBase64 } from "../helpers/getBase64";
import { filterByDate } from "@/helpers/filterByDate";
import { fetchInvoices } from "@/api/mockApis";
import { ClipLoader } from "react-spinners";
import { v4 as uuidv4 } from "uuid";

const Invoices = () => {
   const [invoices, setInvoices] = useState<InvoicesPropTypes[]>([]);
   const [loading, setLoading] = useState(false);
   const [searchInput, setSearchInput] = useState<string>("");
   const [selectedFilter, setSelectedFilter] = useState<string>("");

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
            const fetchedInvoices = await fetchInvoices();
            setInvoices(fetchedInvoices);
            setLoading(false);
         }, 500);
      }
      fetchData();
   }, []);

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
   };

   const searchInvoices = (invoice: InvoicesPropTypes) => {
      const docName = invoice.title;
      return docName.toLowerCase().includes(searchInput.toLowerCase());
   };

   const handleFilter = (title: string) => {
      setSelectedFilter(title);
   };

   const filteredReceipts = invoices
      ? invoices
           .filter(
              (invoice) =>
                 searchInvoices(invoice) &&
                 filterByDate(invoice, selectedFilter)
           )
           .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
           )
      : [];

   const handleSelectedFile = async (
      e: React.ChangeEvent<HTMLInputElement>
   ) => {
      const selectedFiles = Array.from(e.target.files || []);

      for (let index = 0; index < selectedFiles.length; index++) {
         const selectedFile = selectedFiles[index];
         const base64File = await getBase64(selectedFile); // Convert file to base64

         // Check if base64File is a string and handle the null case
         if (typeof base64File !== "string") {
            console.error("Failed to convert file to base64");
            return;
         }

         // Convert current date to ISO date string
         const currentDate = new Date().toISOString();

         // Simulate file upload completion and set the file to the state
         setTimeout(() => {
            async () => {
               // const { email, token } = userProfile;
               // try {
               //    const uploadResponse = await api.post(
               //       "/add-receipt",
               //       {
               //          id: index,
               //          receipt_name: selectedFile.name,
               //          receipt: base64File, // Pass base64 file here
               //       },
               //       {
               //          headers: {
               //             useremail: email,
               //             usertoken: token,
               //          },
               //       }
               //    );
               //    // If upload is successful, add the new receipt to the Redux state
               //    if (uploadResponse.status === 200) {
               //       // Optionally fetch the updated list of documents from the server
               //       const updatedDocuments = await getReceipts(email, token);
               //       dispatch(setReceipts(updatedDocuments.data.receipts));
               //    }
               // } catch (error) {
               //    console.error("API Error:", error);
               //    // Handle error, log it, or display a user-friendly message
               // }
            };

            const newInvoice: InvoicesPropTypes = {
               id: uuidv4(),
               title: selectedFile.name,
               owner_info: {
                  fullname: "Micheal",
               },
               date: currentDate,
               base64: base64File,
            };

            setInvoices((prevInvoices) => [...prevInvoices, newInvoice]);
         }, 200);
      }
   };

   return (
      <div className="flex flex-col gap-9">
         <UploadPdfImage
            isUploadReceipt
            handleFileUpload={handleSelectedFile}
         />

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
                  <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                     {filteredReceipts.map((receipt, index) => (
                        <ReceiptCard key={index} invoice={receipt} />
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
   );
};

export default Invoices;
