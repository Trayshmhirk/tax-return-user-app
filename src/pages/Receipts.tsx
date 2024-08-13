import { useState } from "react";
import SearchAndFilter from "../components/SearchAndFilter";
import UploadPdfImage from "../components/UploadPdfImage";
import ReceiptCard from "../components/ReceiptCard";
import { useNavigate } from "react-router-dom";
import { ReceiptsPropTypes } from "../types/AllTypes";
import { receipts } from "../mocks/AllMockData";

const Receipts = () => {
   const navigate = useNavigate();

   const [searchInput, setSearchInput] = useState<string>("");
   const [selectedFilter, setSelectedFilter] = useState<string>("");
   const [activeFilter, setActiveFilter] = useState<string>("All");
   const filterTitleList = ["All", "Today", "This week", "This month"];

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

   const getTimelyValue = (dateString: string) => {
      const receiptDate = new Date(dateString);
      const currentDate = new Date();

      if (
         receiptDate.getDate() === currentDate.getDate() &&
         receiptDate.getMonth() === currentDate.getMonth() &&
         receiptDate.getFullYear() === currentDate.getFullYear()
      ) {
         return "Today";
      }

      const startOfWeek = currentDate.getDate() - currentDate.getDay();
      const endOfWeek = startOfWeek + 6;
      if (
         receiptDate.getDate() >= startOfWeek &&
         receiptDate.getDate() <= endOfWeek
      ) {
         return "This week";
      }

      if (receiptDate.getMonth() === currentDate.getMonth()) {
         return "This month";
      }

      return "Earlier";
   };

   const filterByDate = (receipt: ReceiptsPropTypes) => {
      if (selectedFilter === "" || selectedFilter === "All") {
         // if no filter is selected, all users should be included
         return true;
      }
      return getTimelyValue(receipt.date) === selectedFilter;
   };

   const filteredReceipts = receipts
      ? receipts.filter(
           (receipt) => searchReceipts(receipt) && filterByDate(receipt)
        )
      : [];

   function getBase64(file: File): Promise<string | ArrayBuffer | null> {
      return new Promise((resolve, reject) => {
         const reader = new FileReader();
         reader.readAsDataURL(file);
         reader.onload = () => resolve(reader.result);
         reader.onerror = (error) => reject(error);
      });
   }

   const handleSelectedFile = async (
      e: React.ChangeEvent<HTMLInputElement>
   ) => {
      const selectedFiles = Array.from(e.target.files || []);

      for (let index = 0; index < selectedFiles.length; index++) {
         const selectedFile = selectedFiles[index];
         const base64File = await getBase64(selectedFile); // Convert file to base64
         console.log(base64File);

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

   const handleOpenReceipt = (
      receiptId: string,
      title: string,
      fullname: string,
      date: string
   ) => {
      navigate("view-receipt", {
         state: { data: { receiptId, title, fullname, date } },
      });
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
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            title={filterTitleList}
         />

         <div className="w-full flex flex-wrap gap-5">
            {filteredReceipts.length ? (
               <>
                  {filteredReceipts.map((receipt, index) => (
                     <ReceiptCard
                        key={index}
                        receiptId={receipt.id}
                        handleClick={() => handleOpenReceipt}
                        title={receipt.title}
                        owner_info={receipt.owner_info}
                        date={receipt.date}
                     />
                  ))}
               </>
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
