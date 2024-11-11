import { useEffect, useState } from "react";
import { transactionColumns } from "./transactionColumns";
import { DataTable } from "./data-table";
import { ClipLoader } from "react-spinners";
import { TransactionPropTypes } from "@/types/Types";
import { fetchTransactions } from "@/api/mockApis";
import { Button } from "../ui/button";
import { BsFillGridFill } from "react-icons/bs";
import { RiListCheck3 } from "react-icons/ri";
import useWindowWidth from "@/hooks/useWindowWidth";
import SearchAndFilter from "../common/SearchAndFilter";
import TransactionCard from "../cards/TransactionCard";
import PlaceholderText from "../common/PlaceholderText";

const RecentTransactions = ({
   selectedCardId,
}: {
   selectedCardId: string | undefined;
}) => {
   // Get the window width from the hook
   const windowWidth = useWindowWidth();
   const isbelowXs = windowWidth < 375;

   const [transactions, setTransactions] = useState<TransactionPropTypes[]>([]);
   const [loading, setLoading] = useState(false);
   const [isList, setIsList] = useState(true);
   const [searchInput, setSearchInput] = useState("");
   const [selectedFilter, setSelectedFilter] = useState("");
   const filterTitleList = ["All", "Pending", "Paid", "Overdue", "Failed"];

   useEffect(() => {
      async function fetchData() {
         setLoading(true);

         setTimeout(async () => {
            const fetchedTransactions = await fetchTransactions(selectedCardId); // Fetch the data
            setTransactions(fetchedTransactions);
            setLoading(false);
         }, 300);
      }

      fetchData();
   }, [selectedCardId]);

   const handleToggleGrid = () => {
      setIsList(false);
   };

   const handleToggleList = () => {
      setIsList(true);
   };

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
   };

   const handleFilter = (title: string) => {
      setSelectedFilter(title);
   };

   const searchTransactions = (transaction: TransactionPropTypes) => {
      const docName = transaction.description;
      return docName.toLowerCase().includes(searchInput.toLowerCase());
   };

   const filterByStatus = (transaction: TransactionPropTypes) => {
      if (selectedFilter === "" || selectedFilter === "All") {
         // if no filter is selected, all users should be included
         return true;
      }
      return transaction.status.toLowerCase() === selectedFilter.toLowerCase();
   };

   const filteredTransactions = transactions
      ? transactions
           .filter(
              (transaction) =>
                 searchTransactions(transaction) && filterByStatus(transaction)
           )
           .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
           )
      : [];

   const handleDeleteTransaction = (transactionId: string) => {
      // Remove the invoice with the specified ID from the invoices state
      setTransactions((prevTransaction) =>
         prevTransaction.filter(
            (transaction) => transaction.id !== transactionId
         )
      );
   };

   return (
      <div className="flex flex-col gap-7 bg-white dark:bg-gray p-5 rounded-xl shadow-md dark:shadow-md-dark w-full">
         <div className="flex justify-between items-center gap-4 mt-[2px]">
            <h2 className="text-lg font-semibold">Recent Transactions</h2>

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

         <div className="md:px-4">
            {isList ? (
               <>
                  {loading ? (
                     <div className="w-full h-20 flex justify-center items-center">
                        <ClipLoader color="#00A2C9" />
                     </div>
                  ) : (
                     <DataTable
                        columns={transactionColumns(handleDeleteTransaction)}
                        data={transactions}
                     />
                  )}
               </>
            ) : (
               <>
                  {loading ? (
                     <div className="w-full h-20 flex justify-center items-center">
                        <ClipLoader color="#00A2C9" />
                     </div>
                  ) : (
                     <div className="flex flex-col gap-7">
                        <SearchAndFilter
                           handleSearch={handleSearch}
                           handleFilter={handleFilter}
                           title={filterTitleList}
                        />

                        <div className="w-full pb-3">
                           {filteredTransactions.length !== 0 ? (
                              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                 {filteredTransactions.map((transaction) => (
                                    <TransactionCard
                                       key={transaction.id}
                                       transaction={transaction}
                                       handleDeleteTransaction={
                                          handleDeleteTransaction
                                       }
                                    />
                                 ))}
                              </div>
                           ) : (
                              <PlaceholderText text="No transactions found." />
                           )}
                        </div>
                     </div>
                  )}
               </>
            )}
         </div>
      </div>
   );
};

export default RecentTransactions;
