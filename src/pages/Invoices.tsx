import { useEffect, useState } from "react";
import SearchAndFilter from "../components/common/SearchAndFilter";
import ReceiptCard from "../components/cards/InvoiceCard";
import { InvoicesPropTypes } from "../types/AllTypes";
import { filterByDate } from "@/helpers/filterByDate";
import { fetchInvoices } from "@/api/mockApis";
import { ClipLoader } from "react-spinners";

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

   return (
      <div className="flex flex-col gap-9">
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
