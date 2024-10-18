import { MessageType } from "@/types/Types";

export function groupMessagesByType(messages: MessageType[]) {
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
   }, [] as MessageType[][]);
}
