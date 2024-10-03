import { useEffect, useState } from "react";
import SearchAndFilter from "@/components/common/SearchAndFilter";
import InvoiceCard from "@/components/cards/InvoiceCard";
import { InvoicesPropTypes } from "@/types/AllTypes";
import { filterByDate } from "@/helpers/filterByDate";
import { fetchInvoices } from "@/api/mockApis";
import { ClipLoader } from "react-spinners";
import MetricsCard from "@/components/cards/MetricsCard";
import { invoiceMetrics } from "@/mocks/AllMockData";

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

   const filteredInvoices = invoices
      ? invoices
           .filter(
              (invoice) =>
                 searchInvoices(invoice) &&
                 filterByDate(invoice, selectedFilter)
           )
           .sort(
              (a, b) =>
                 new Date(b.due_date).getTime() - new Date(a.due_date).getTime()
           )
      : [];

   return (
      <div className="flex flex-col gap-9">
         <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {invoiceMetrics.map((metric) => (
               <MetricsCard metric={metric} />
            ))}
         </div>
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
               {filteredInvoices.length ? (
                  <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                     {filteredInvoices.map((invoice, index) => (
                        <InvoiceCard key={index} invoice={invoice} />
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
