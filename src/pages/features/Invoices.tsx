import { useState } from "react";
import SearchAndFilter from "@/components/common/SearchAndFilter";
import InvoiceCard from "@/components/cards/InvoiceCard";
import { ClipLoader } from "react-spinners";
import MetricsCard from "@/components/cards/MetricsCard";
import { invoiceMetrics } from "@/mocks/MockData";
import {
   useDeleteInvoiceMutation,
   useGetInvoicesQuery,
} from "@/redux/api/apiSlice";
import PlaceholderText from "@/components/common/PlaceholderText";

const Invoices = () => {
   const { data: invoices = [], isLoading } = useGetInvoicesQuery();
   const [deleteInvoice] = useDeleteInvoiceMutation();

   const [searchInput, setSearchInput] = useState("");
   const [selectedFilter, setSelectedFilter] = useState("");
   const filterTitleList = ["All", "Pending", "Paid", "Overdue", "Failed"];

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

   const filterByStatus = (invoice: InvoicesPropTypes) => {
      if (selectedFilter === "" || selectedFilter === "All") {
         // if no filter is selected, all users should be included
         return true;
      }
      return invoice.status.toLowerCase() === selectedFilter.toLowerCase();
   };

   const filteredInvoices = invoices
      ? invoices
           .filter(
              (invoice) => searchInvoices(invoice) && filterByStatus(invoice)
           )
           .sort(
              (a, b) =>
                 new Date(b.due_date).getTime() - new Date(a.due_date).getTime()
           )
      : [];

   const handleDeleteInvoice = (invoiceId: string) => {
      deleteInvoice({ id: invoiceId });
   };

   return (
      <div className="flex flex-col gap-7">
         <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {invoiceMetrics.map((metric, index) => (
               <MetricsCard key={index} metric={metric} />
            ))}
         </div>

         <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
               <p className="font-medium">Recent invoices</p>
               <span>
                  {invoices && invoices.length ? `(${invoices.length})` : "(0)"}
               </span>
            </div>

            <SearchAndFilter
               handleSearch={handleSearch}
               handleFilter={handleFilter}
               title={filterTitleList}
            />

            {isLoading ? (
               <div className="w-full h-20 flex justify-center items-center">
                  <ClipLoader color="#00A2C9" />
               </div>
            ) : (
               <div className="w-full">
                  {filteredInvoices.length !== 0 ? (
                     <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {filteredInvoices.map((invoice, index) => (
                           <InvoiceCard
                              key={index}
                              invoice={invoice}
                              handleDeleteInvoice={handleDeleteInvoice}
                           />
                        ))}
                     </div>
                  ) : (
                     <PlaceholderText text="No invoices found." />
                  )}
               </div>
            )}
         </div>
      </div>
   );
};

export default Invoices;
