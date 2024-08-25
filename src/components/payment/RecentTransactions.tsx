// import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { ClipLoader } from "react-spinners";

// Mock Data for Transactions
// type Transaction = {
//    id: string;
//    date: string;
//    description: string;
//    amount: number;
//    currency: string;
// };

// const transactions: Transaction[] = [
//    {
//       id: "txn_01",
//       date: "2024-08-01",
//       description: "Grocery Store",
//       amount: -50.25,
//       currency: "USD",
//    },
//    {
//       id: "txn_02",
//       date: "2024-08-05",
//       description: "Flight Ticket",
//       amount: -250.0,
//       currency: "USD",
//    },
//    {
//       id: "txn_03",
//       date: "2024-08-10",
//       description: "Restaurant",
//       amount: -80.15,
//       currency: "USD",
//    },
//    {
//       id: "txn_04",
//       date: "2024-08-15",
//       description: "Refund - Online Purchase",
//       amount: 100.0,
//       currency: "USD",
//    },
// ];

async function getData(): Promise<Payment[]> {
   // Simulate an API call to fetch payments data
   return [
      {
         id: "728ed52f",
         amount: 100,
         status: "pending",
         email: "m@example.com",
      },
      {
         id: "8734fb8d",
         amount: 200,
         status: "success",
         email: "j@example.com",
      },
      {
         id: "bc3829f1",
         amount: 150,
         status: "failed",
         email: "l@example.com",
      },
      {
         id: "bc3829f1",
         amount: 150,
         status: "failed",
         email: "l@example.com",
      },
      {
         id: "bc3829f1",
         amount: 150,
         status: "failed",
         email: "l@example.com",
      },
      {
         id: "bc3829f1",
         amount: 150,
         status: "failed",
         email: "l@example.com",
      },
      {
         id: "bc3829f1",
         amount: 150,
         status: "failed",
         email: "l@example.com",
      },
      {
         id: "bc3829f1",
         amount: 150,
         status: "failed",
         email: "l@example.com",
      },
      {
         id: "bc3829f1",
         amount: 150,
         status: "failed",
         email: "l@example.com",
      },
      {
         id: "bc3829f1",
         amount: 150,
         status: "failed",
         email: "l@example.com",
      },
      {
         id: "bc3829f1",
         amount: 150,
         status: "failed",
         email: "l@example.com",
      },
      {
         id: "bc3829f1",
         amount: 150,
         status: "failed",
         email: "l@example.com",
      },
      {
         id: "bc3829f1",
         amount: 150,
         status: "failed",
         email: "l@example.com",
      },
      {
         id: "bc3829f1",
         amount: 150,
         status: "failed",
         email: "l@example.com",
      },
      {
         id: "bc3829f1",
         amount: 150,
         status: "failed",
         email: "l@example.com",
      },
   ];
}

// Recent Transactions UI Component
const RecentTransactions = () => {
   const [data, setData] = useState<Payment[]>([]); // State for data
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
