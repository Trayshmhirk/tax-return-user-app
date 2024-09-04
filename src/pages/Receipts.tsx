import { useState } from "react";
import SearchAndFilter from "../components/common/SearchAndFilter";
import UploadPdfImage from "../components/common/UploadPdfImage";
import ReceiptCard from "../components/cards/ReceiptCard";
import { ReceiptsPropTypes } from "../types/AllTypes";
import { receipts } from "../mocks/AllMockData";
import { getBase64 } from "../helpers/getBase64";
import { filterByDate } from "@/helpers/filterByDate";

const Receipts = () => {
   const [searchInput, setSearchInput] = useState<string>("");
   const [selectedFilter, setSelectedFilter] = useState<string>("");
   const filterTitleList = [
      "All",
      "Today",
      "This week",
      "This month",
      "Earlier",
   ];

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
   };

   const searchReceipts = (receipt: ReceiptsPropTypes) => {
      const docName = receipt.title;
      return docName.toLowerCase().includes(searchInput.toLowerCase());
   };

   const handleFilter = (title: string) => {
      setSelectedFilter(title);
   };

   const filteredReceipts = receipts
      ? receipts.filter(
           (receipt) =>
              searchReceipts(receipt) && filterByDate(receipt, selectedFilter)
        )
      : [];

   const handleSelectedFile = async (
      e: React.ChangeEvent<HTMLInputElement>
   ) => {
      const selectedFiles = Array.from(e.target.files || []);

      for (let index = 0; index < selectedFiles.length; index++) {
         const selectedFile = selectedFiles[index];
         const base64File = await getBase64(selectedFile); // Convert file to base64
         base64File;

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

         <div className="w-full">
            {filteredReceipts.length ? (
               <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {filteredReceipts.map((receipt, index) => (
                     <ReceiptCard key={index} receipt={receipt} />
                  ))}
               </div>
            ) : (
               <p className="pending-text w-full text-center">
                  No results found.
               </p>
            )}
         </div>
      </div>
   );
};

export default Receipts;
