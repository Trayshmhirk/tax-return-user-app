/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCurrentMonth } from "../../helpers/getCurrentMonth";

type CustomTooltipProps = {
   active?: any;
   payload?: any;
   label?: any;
   coordinate?: any;
};

// Custom Tooltip Renderer to highlight the current month tooltip
export const CustomTooltip = ({
   active,
   payload,
   label,
   coordinate,
}: CustomTooltipProps) => {
   const currentMonth = getCurrentMonth();

   if (active && payload && payload.length) {
      const isCurrentMonth = label === currentMonth;

      return (
         <div
            className="w-24 bg-white rounded-md p-3 text-center shadow-md dark:shadow-md-dark"
            style={{
               position: "absolute",
               left: `${coordinate.x}px`,
               top: `${coordinate.y - 50}px`,
               background: isCurrentMonth ? "#00A2C9" : "#F5F5F5",
               padding: "5px",
               color: isCurrentMonth ? "#fff" : "#000",
               transform: "translateX(-50%)",
            }}
         >
            <p className="text-sm font-medium">{label}</p>
            <p className="text-xs">{`Debit: $${payload[0].value}`}</p>
         </div>
      );
   }

   return null;
};
