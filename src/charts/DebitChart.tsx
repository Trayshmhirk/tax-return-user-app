/* eslint-disable @typescript-eslint/no-explicit-any */

import { PureComponent } from "react";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

import { CustomTick } from "../components/custom/CustomTick";
import { CustomTooltip } from "../components/custom/CustomTooltip";

// Sample data
const data = [
   { name: "Jan", debit: 2400 },
   { name: "Feb", debit: 1398 },
   { name: "Mar", debit: 6800 },
   { name: "Apr", debit: 3908 },
   { name: "May", debit: 4800 },
   { name: "Jun", debit: 3800 },
   { name: "Jul", debit: 4300 },
   { name: "Aug", debit: 4300 },
   { name: "Sep", debit: 4300 },
   { name: "Oct", debit: 4300 },
   { name: "Nov", debit: 4300 },
   { name: "Dec", debit: 4300 },
];

// Function to get the current month index (0-based)
const getCurrentMonthIndex = () => {
   return new Date().getMonth(); // e.g., 7 for August
};

export default class DebitChart extends PureComponent {
   render() {
      // Get the current month debit value
      const currentMonthIndex = getCurrentMonthIndex();
      const currentMonthData = data[currentMonthIndex];
      const currentMonthDebit = currentMonthData ? currentMonthData.debit : 0;
      const currentMonthName = currentMonthData ? currentMonthData.name : 0;

      return (
         <div className="w-full max-w-[600px]">
            <div className="flex flex-col gap-5 bg-white dark:bg-gray rounded-xl p-5 shadow-md dark:shadow-md-dark">
               {/* Debit analytics title with current month debit */}
               <div className="flex flex-col gap-1">
                  <div className="text-xs font-medium">Debit analytics</div>
                  <div className="text-xl font-semibold">
                     {currentMonthName}: ${currentMonthDebit}
                  </div>
               </div>

               {/* Line chart */}
               <ResponsiveContainer width="100%" height={200}>
                  <LineChart
                     width={500}
                     height={300}
                     data={data}
                     margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                     }}
                  >
                     <XAxis
                        dataKey="name"
                        tick={<CustomTick />}
                        axisLine={false}
                        tickLine={false}
                     />
                     <Tooltip content={<CustomTooltip />} />
                     <Line
                        type="monotone"
                        dataKey="debit"
                        stroke="#00A2C9"
                        activeDot={{ r: 6 }}
                        dot={false}
                     />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </div>
      );
   }
}
