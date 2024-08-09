type InvoicePropTypes = {
   id: string;
   transaction_id: string;
   title: string;
   date: string;
   total: string;
};

const invoices: InvoicePropTypes[] = [
   {
      id: "345",
      transaction_id: "3adfb84tbdvber78",
      title: "Transact",
      date: "4th aug, 2024",
      total: "300",
   },
   {
      id: "234",
      transaction_id: "adf367dvber78fjadb",
      title: "Transaction",
      date: "9th aug, 2024",
      total: "500",
   },
   {
      id: "456",
      transaction_id: "adf367dvber78fjadb",
      title: "Transaction",
      date: "9th aug, 2024",
      total: "500",
   },
   {
      id: "940",
      transaction_id: "adf367dvber78fjadb",
      title: "Transaction",
      date: "9th aug, 2024",
      total: "500",
   },
   {
      id: "257",
      transaction_id: "adf367dvber78fjadb",
      title: "Transaction",
      date: "9th aug, 2024",
      total: "500",
   },
];

import { useState } from "react";
import SearchAndFilter from "../components/SearchAndFilter";
import InvoiceCard from "../components/InvoiceCard";

const Transactions = () => {
   const [searchInput, setSearchInput] = useState("");
   const [selectedFilter, setSelectedFilter] = useState("");
   const [activeFilter, setActiveFilter] = useState("All");
   // const [invoice, setInvoice] = useState([]);
   const filterTitleList = ["All", "Today", "This week", "This month"];

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
   };

   const searchInvoice = (invoice: InvoicePropTypes) => {
      const invoiceName = invoice.title;
      return invoiceName.toLowerCase().includes(searchInput.toLowerCase());
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

   const filterByDate = (invoice: InvoicePropTypes) => {
      if (selectedFilter === "" || selectedFilter === "All") {
         // if no filter is selected, all users should be included
         return true;
      }
      return getTimelyValue(invoice.date) === selectedFilter;
   };

   const filteredInvoices = invoices
      ? invoices.filter(
           (invoice) => searchInvoice(invoice) && filterByDate(invoice)
        )
      : [];

   const handleShowInvoiceModal = (invoice: InvoicePropTypes) => {
      // setInvoice(invoice);
      console.log(invoice);
   };

   return (
      <div className="flex flex-col gap-9">
         <SearchAndFilter
            handleSearch={handleSearch}
            handleFilter={handleFilter}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            title={filterTitleList}
         />

         <div className="w-full flex flex-wrap gap-5">
            {filteredInvoices.length ? (
               <>
                  {filteredInvoices.map((invoice) => (
                     <InvoiceCard
                        key={invoice.id}
                        invoice={invoice}
                        handleClick={handleShowInvoiceModal}
                        invoiceId={invoice.transaction_id}
                        invoiceName={invoice.title}
                        date={invoice.date}
                        price={invoice.total}
                     />
                  ))}
               </>
            ) : (
               <p className="pending-text w-100 text-center">
                  No transactions found.
               </p>
            )}
         </div>
      </div>
   );
};

export default Transactions;
