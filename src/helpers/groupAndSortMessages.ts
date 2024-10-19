import { format } from "date-fns";
import { MessagesPropType } from "@/types/Types";

// Helper to sort messages by timestamp
const sortMessagesByTimestamp = (messages: MessagesPropType[]) => {
   return messages.sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return timeA - timeB;
   });
};

// Helper to group messages by date and sort them by timestamp within each date
export const groupAndSortMessages = (messages: MessagesPropType[]) => {
   // Group by date and sort messages within each group
   const groupedMessages = Object.entries(
      messages.reduce(
         (acc, message) => {
            const date = format(new Date(message.timestamp), "MMM d, yyyy");

            if (!acc[date]) acc[date] = [];
            acc[date].push(message);
            return acc;
         },
         {} as { [date: string]: MessagesPropType[] }
      )
   )
      /* explicitly specify the return type of the function */
      .map(([date, messages]): [string, MessagesPropType[]] => {
         // Ensure the messages is always treated as an array of messages
         const sortedMessages = sortMessagesByTimestamp(messages);
         return [date, sortedMessages]; // Explicitly typed return
      });

   return groupedMessages;
};
