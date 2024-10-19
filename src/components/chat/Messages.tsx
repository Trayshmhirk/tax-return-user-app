import { useEffect, useRef } from "react";
import MessageIn from "./MessageIn";
import MessageOut from "./MessageOut";
import { MessagesPropType } from "@/types/Types";

type MessagesPropTypes = {
   messages: MessagesPropType[]; // Array of message objects
};

const Messages = ({ messages }: MessagesPropTypes) => {
   const messagesEndRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);

   const formatTime = (timestamp: string) => {
      const date = new Date(timestamp);
      const hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "pm" : "am";
      const formattedHours = hours % 12 || 12; // Convert to 12-hour format

      return `${formattedHours}:${minutes} ${ampm}`;
   };

   const renderMessages = () => {
      return messages.map((message) => {
         const borderRadiusStyle =
            message.type === "incoming" ? "8px 8px 8px 0px" : "8px 8px 0px 8px";

         if (message.type === "incoming") {
            return (
               <MessageIn
                  key={message.id}
                  text={message.text}
                  timeStamp={formatTime(message.timestamp)}
                  borderRadius={borderRadiusStyle}
                  // selectedDocuments={message.selectedDocument}
               />
            );
         } else {
            return (
               <MessageOut
                  key={message.id}
                  text={message.text}
                  timeStamp={formatTime(message.timestamp)}
                  borderRadius={borderRadiusStyle}
                  // selectedDocuments={message.selectedDocument}
               />
            );
         }
      });
   };

   return (
      <div
         ref={messagesEndRef}
         className="flex flex-col gap-4 px-1 lg:px-8 py-1"
      >
         {renderMessages()}
      </div>
   );
};

export default Messages;
