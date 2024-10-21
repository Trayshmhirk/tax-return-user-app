import { MessagesPropType } from "@/types/Types";
import { formatTime } from "./formatTime";
import { format } from "date-fns";

// get last message in the messages array
export const getLastMessage = (messages: MessagesPropType[]) => {
   if (messages.length === 0) return null; // Return null if no messages
   return messages[messages.length - 1]; // Return the last message
};

// Function to render the text of the last message
export const renderCurrentMessage = (messages: MessagesPropType[]) => {
   const lastMessage = getLastMessage(messages);
   return lastMessage ? lastMessage.text : ""; // Return text or empty string
};

// Function to render the time of the last message
export const renderCurrentMessageTime = (messages: MessagesPropType[]) => {
   const lastMessage = getLastMessage(messages);
   return lastMessage ? formatTime(lastMessage.timestamp) : ""; // Format timestamp or return empty string
};

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

// group messages by incoming or outgoing type
export function groupMessagesByType(messages: MessagesPropType[]) {
   return messages.reduce((groupedMessages, currentMessage, index, arr) => {
      const previousMessage = arr[index - 1];

      if (previousMessage && previousMessage.type === currentMessage.type) {
         // Add current message to the previous group if of the same type
         groupedMessages[groupedMessages.length - 1].push(currentMessage);
      } else {
         // Start a new group for different types
         groupedMessages.push([currentMessage]);
      }

      return groupedMessages;
   }, [] as MessagesPropType[][]);
}
