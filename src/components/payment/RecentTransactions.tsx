import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

// Mock Data for Transactions
type Transaction = {
   id: string;
   date: string;
   description: string;
   amount: number;
   currency: string;
};

const transactions: Transaction[] = [
   {
      id: "txn_01",
      date: "2024-08-01",
      description: "Grocery Store",
      amount: -50.25,
      currency: "USD",
   },
   {
      id: "txn_02",
      date: "2024-08-05",
      description: "Flight Ticket",
      amount: -250.0,
      currency: "USD",
   },
   {
      id: "txn_03",
      date: "2024-08-10",
      description: "Restaurant",
      amount: -80.15,
      currency: "USD",
   },
   {
      id: "txn_04",
      date: "2024-08-15",
      description: "Refund - Online Purchase",
      amount: 100.0,
      currency: "USD",
   },
   {
      id: "txn_04",
      date: "2024-08-15",
      description: "Refund - Online Purchase",
      amount: 100.0,
      currency: "USD",
   },
   {
      id: "txn_04",
      date: "2024-08-15",
      description: "Refund - Online Purchase",
      amount: 100.0,
      currency: "USD",
   },
   {
      id: "txn_04",
      date: "2024-08-15",
      description: "Refund - Online Purchase",
      amount: 100.0,
      currency: "USD",
   },
   {
      id: "txn_04",
      date: "2024-08-15",
      description: "Refund - Online Purchase",
      amount: 100.0,
      currency: "USD",
   },
];

// Recent Transactions UI Component
const RecentTransactions = () => {
   return (
      <div className="bg-white dark:bg-gray p-6 rounded-xl shadow-md dark:shadow-md-dark w-full">
         <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="border-b border-gray-300 dark:border-gray-600">
                  <th className="pb-2 font-medium text-gray-700 dark:text-gray-300">
                     Date
                  </th>
                  <th className="pb-2 font-medium text-gray-700 dark:text-gray-300">
                     Description
                  </th>
                  <th className="pb-2 font-medium text-gray-700 dark:text-gray-300 text-right">
                     Amount
                  </th>
               </tr>
            </thead>
            <tbody>
               {transactions.map((txn) => (
                  <tr
                     key={txn.id}
                     className="border-b border-gray-300 dark:border-gray-600"
                  >
                     <td className="py-2 text-gray-600 dark:text-gray-300">
                        {txn.date}
                     </td>
                     <td className="py-2 text-gray-600 dark:text-gray-300">
                        {txn.description}
                     </td>
                     <td
                        className={`py-2 text-right ${txn.amount < 0 ? "text-red-500" : "text-green-500"} font-semibold`}
                     >
                        {txn.amount < 0 ? (
                           <div className="flex items-center justify-end gap-1">
                              <FaArrowDown className="text-red-500" />
                              -${Math.abs(txn.amount).toFixed(2)} {txn.currency}
                           </div>
                        ) : (
                           <div className="flex items-center justify-end gap-1">
                              <FaArrowUp className="text-green-500" />
                              +${Math.abs(txn.amount).toFixed(2)} {txn.currency}
                           </div>
                        )}
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default RecentTransactions;
