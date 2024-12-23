/* eslint-disable @typescript-eslint/no-explicit-any */

import { PureComponent } from "react";
import { XAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

import { CustomTick } from "../custom/CustomTick";
import { CustomTooltip } from "../custom/CustomTooltip";

// Sample data
const data = [
   { name: "Jan", debit: 0, credit: 500 },
   { name: "Feb", debit: 1398, credit: 3000 },
   { name: "Mar", debit: 6800, credit: 3000 },
   { name: "Apr", debit: 3908, credit: 3000 },
   { name: "May", debit: 4800, credit: 3000 },
   { name: "Jun", debit: 3800, credit: 3000 },
   { name: "Jul", debit: 4300, credit: 3000 },
   { name: "Aug", debit: 5300, credit: 3000 },
   { name: "Sep", debit: 4300, credit: 3000 },
   { name: "Oct", debit: 4000, credit: 3000 },
   { name: "Nov", debit: 2000, credit: 3000 },
   { name: "Dec", debit: 0, credit: 3000 },
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
         <div className="w-full">
            <div className="h-full flex flex-col gap-5 bg-white dark:bg-gray rounded-xl px-5 py-4 shadow-md dark:shadow-md-dark">
               <div className="flex flex-col gap-2">
                  <div className="text-xs font-medium">Debit analytics</div>
                  <div className="flex gap-2 items-center font-semibold">
                     <span>{currentMonthName}:</span>
                     <span className="bg-richElectricBlue text-lg font-medium text-white px-2 rounded">
                        ${currentMonthDebit}
                     </span>
                  </div>
               </div>

               <ResponsiveContainer width="100%" height={215}>
                  <AreaChart
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
                     <defs>
                        <linearGradient
                           id="colorDebit"
                           x1="0"
                           y1="0"
                           x2="0"
                           y2="1"
                        >
                           <stop
                              offset="5%"
                              stopColor="#00A2C9"
                              stopOpacity={0.8}
                           />
                           <stop
                              offset="95%"
                              stopColor="#00A2C9"
                              stopOpacity={0}
                           />
                        </linearGradient>
                        <linearGradient
                           id="colorCredit"
                           x1="0"
                           y1="0"
                           x2="0"
                           y2="1"
                        >
                           <stop
                              offset="5%"
                              stopColor="#B8B8B8"
                              stopOpacity={0.8}
                           />
                           <stop
                              offset="95%"
                              stopColor="#B8B8B8"
                              stopOpacity={0}
                           />
                        </linearGradient>
                     </defs>
                     <XAxis
                        dataKey="name"
                        tick={<CustomTick />}
                        axisLine={false}
                        tickLine={false}
                     />
                     <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ stroke: "#00A2C9" }}
                     />
                     <Area
                        type="monotone"
                        dataKey="debit"
                        stroke="#00A2C9"
                        activeDot={{ r: 6 }}
                        fillOpacity={1}
                        strokeWidth={2}
                        fill="url(#colorDebit)"
                        dot={false}
                     />
                     <Area
                        type="monotone"
                        dataKey="credit"
                        stroke="#B8B8B8"
                        fillOpacity={1}
                        strokeWidth={2}
                        activeDot={{ r: 4 }}
                        fill="url(#colorCredit)"
                        dot={false}
                     />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>
      );
   }
}
