import { MetricCardProps } from "@/types/AllTypes";
import { TrendingUp, TrendingDown } from "lucide-react";

const MetricsCard = ({ metric }: MetricCardPropsTypes) => {
   return (
      <div className="w-full flex flex-col gap-3 bg-bubbles dark:bg-opacity-90 text-eerieBlack p-3 px-5 rounded-lg shadow-md dark:shadow-md-dark">
         <p className="text-2xl md:text-4xl text-richElectricBlue font-bold">
            {metric.amount}
         </p>
         <div className="flex flex-col gap-2">
            <p className="font-lg font-medium">
               {metric.invoice_status === "paid" && "Paid invoice"}
               {metric.invoice_status === "pending" && "Pending invoice"}
               {metric.invoice_status === "overdue" && "Overdue invoice"}
               {metric.invoice_status === "failed" && "Failed invoice"}
            </p>

            <span className="flex items-center gap-1 text-xs">
               <span
                  className={`flex items-center gap-1 font-bold ${metric.is_percentage_increase === true ? "text-green-600" : "text-red-600"}`}
               >
                  {metric.is_percentage_increase === true ? (
                     <TrendingUp className="w-5 h-5" />
                  ) : (
                     <TrendingDown className="w-5 h-5" />
                  )}
                  {metric.percentage}%
               </span>
               <p className="font-medium">last month</p>
            </span>
         </div>
      </div>
   );
};

export default MetricsCard;

type MetricCardPropsTypes = {
   metric: MetricCardProps;
};
