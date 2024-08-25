// import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Transaction, columns } from "./columns";
import { DataTable } from "./data-table";
import { ClipLoader } from "react-spinners";

// const transactions: Transaction[] = [

// ];

async function getData(): Promise<Transaction[]> {
   // Simulate an API call to fetch payments data
   return [
      {
         id: "txn_01",
         date: "2024-08-01",
         description: "Grocery Store",
         amount: 50.25,
         currency: "USD",
         status: "success",
      },
      {
         id: "txn_02",
         date: "2024-08-05",
         description: "Flight Ticket",
         amount: 250.0,
         currency: "USD",
         status: "failed",
      },
      {
         id: "txn_03",
         date: "2024-08-10",
         description: "Restaurant",
         amount: 80.15,
         currency: "USD",
         status: "pending",
      },
      {
         id: "txn_04",
         date: "2024-08-15",
         description: "Refund - Online Purchase",
         amount: 100.0,
         currency: "USD",
         status: "processing",
      },
      {
         id: "txn_05",
         date: "2024-08-25",
         description: "Refund - Online Purchase",
         amount: 100.0,
         currency: "USD",
         status: "processing",
      },
      {
         id: "txn_06",
         date: "2024-07-25",
         description: "Refund - Online Purchase",
         amount: 100.0,
         currency: "USD",
         status: "processing",
      },
      {
         id: "txn_07",
         date: "2024-06-25",
         description: "Online Purchase",
         amount: 100.0,
         currency: "USD",
         status: "success",
      },
   ];
}

// Recent Transactions UI Component
const RecentTransactions = () => {
   const [data, setData] = useState<Transaction[]>([]); // State for data
   const [loading, setLoading] = useState(true); // State for loading status

   useEffect(() => {
      async function fetchData() {
         const payments = await getData(); // Fetch the data
         setData(payments); // Set the fetched data to state

         setTimeout(() => {
            setLoading(false);
         }, 1500);
      }

      fetchData(); // Call the fetch function on component mount
   }, []);

   return (
      <div className="flex flex-col gap-5 bg-white dark:bg-gray px-5 py-4 rounded-xl shadow-md dark:shadow-md-dark w-full">
         <h2 className="text-xl font-semibold">Recent Transactions</h2>

         <div className="md:px-5">
            {loading ? (
               <div className="w-full h-20 flex justify-center items-center">
                  <ClipLoader color="#00A2C9" />
               </div>
            ) : (
               <DataTable columns={columns} data={data} /> // Render the DataTable with the fetched data
            )}
         </div>
      </div>
   );
};

export default RecentTransactions;
