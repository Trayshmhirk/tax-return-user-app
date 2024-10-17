import { useEffect, useRef } from "react";
import MessageIn from "./MessageIn";
import MessageOut from "./MessageOut";

type MessageType = {
   id: string;
   text: string;
   timestamp: string; // We can later use a Date type if needed
   type: "incoming" | "outgoing"; // To differentiate between incoming and outgoing messages
};

type MessagesPropTypes = {
   messages: MessageType[]; // Array of message objects
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
      const renderedMessages = [];

      if (!Array.isArray(messages) || messages.length === 0) {
         return null;
      }

      // Sort messages by timestamp
      const sortedMessages = [...messages].sort(
         (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );

      // Group messages by timestamp
      const messageGroups = sortedMessages.reduce(
         (groups, message) => {
            const timestamp = Math.floor(
               new Date(message.timestamp).getTime() / 1000
            ); // Group by second
            if (!groups[timestamp]) {
               groups[timestamp] = [];
            }
            groups[timestamp].push(message);
            return groups;
         },
         {} as Record<number, MessageType[]>
      );

      // Render each group
      for (const timestamp in messageGroups) {
         const group = messageGroups[timestamp];
         renderedMessages.push(renderMessageGroup(group));
      }

      return renderedMessages;
   };

   const renderMessageGroup = (group: MessageType[]) => {
      const firstMessage = group[0];
      const lastMessage = group[group.length - 1];

      const borderRadiusStyle =
         lastMessage.type === "incoming"
            ? "16px 16px 16px 0px"
            : "16px 16px 0px 16px";

      if (firstMessage.type === "incoming") {
         return (
            <div className="flex flex-col gap-2">
               {group.map((message, index) => (
                  <MessageIn
                     key={message.id}
                     text={message.text}
                     timeStamp={formatTime(message.timestamp)}
                     borderRadius={
                        index === group.length - 1 ? borderRadiusStyle : ""
                     }
                     // selectedDocuments={message.selectedDocument}
                  />
               ))}
            </div>
         );
      } else {
         return (
            <div className="flex flex-col justify-end gap-2">
               {group.map((message, index) => (
                  <MessageOut
                     key={index}
                     text={message?.text}
                     timeStamp={formatTime(message.timestamp)}
                     borderRadius={
                        index === group.length - 1 ? borderRadiusStyle : ""
                     }
                     // selectedDocuments={message.selectedDocument}
                  />
               ))}
            </div>
         );
      }
   };

   return (
      <div ref={messagesEndRef} className="flex flex-col gap-4 px-8 py-1">
         {renderMessages()}
      </div>
   );
};

export default Messages;
