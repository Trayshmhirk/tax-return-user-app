import { format } from "date-fns";
export const formatTime = (timestamp: string) => {
   return format(new Date(timestamp), "h:mm a");
};
