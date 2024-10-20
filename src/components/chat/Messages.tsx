import { useEffect, useRef } from "react";
import MessageIn from "./MessageIn";
import MessageOut from "./MessageOut";
import { MessagesPropType } from "@/types/Types";

type MessagesPropTypes = {
   messages: MessagesPropType[]; // Array of message objects
   borderRadius: string; // Optional border radius prop
   isLastMessage: boolean;
};

const Messages = ({
   messages,
   borderRadius,
   isLastMessage,
}: MessagesPropTypes) => {
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
      return messages.map((message) =>
         // Use the passed borderRadius for each message
         message.type === "incoming" ? (
            <MessageIn
               key={message.id}
               text={message.text}
               timeStamp={formatTime(message.timestamp)}
               borderRadius={borderRadius} // Apply the border radius
               isLastMessage={isLastMessage}
            />
         ) : (
            <MessageOut
               key={message.id}
               text={message.text}
               timeStamp={formatTime(message.timestamp)}
               borderRadius={borderRadius} // Apply the border radius
               isLastMessage={isLastMessage}
            />
         )
      );
   };

   return (
      <div
         ref={messagesEndRef}
         className="flex flex-col gap-4 px-1 lg:px-8 py-[2px]"
      >
         {renderMessages()}
      </div>
   );
};

export default Messages;
