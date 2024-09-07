/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCurrentMonth } from "../../helpers/getCurrentMonth";
import { useTheme } from "@/hooks/useTheme";

type CustomTickProps = {
   x?: any;
   y?: any;
   payload?: {
      value: any;
   };
};

// Custom XAxis Tick Renderer to highlight the current month
export const CustomTick = ({ x, y, payload }: CustomTickProps) => {
   const currentMonth = getCurrentMonth();
   const isHighlighted = payload?.value === currentMonth;

   const { theme } = useTheme();

   const isDark = theme === "dark";

   return (
      <g transform={`translate(${x},${y})`}>
         {isHighlighted && (
            <rect
               x={-20}
               y={0.3}
               width={40}
               height={24}
               fill="#00A2C9"
               rx={4}
            />
         )}
         <text
            x={0}
            y={0}
            dy={16}
            textAnchor="middle"
            fill={isHighlighted ? "#fff" : isDark ? "#fff" : ""}
            fontWeight={isHighlighted ? "bold" : "500"}
            fontSize={14}
         >
            {payload?.value}
         </text>
      </g>
   );
};
