// import { useEffect, useRef } from "react";
import IncomingMessageBubble from "./IncomingMessageBubble";
import OutgoingMessageBubble from "./OutgoingMessageBubble";
import { MessagesPropType } from "@/types/Types";
import { formatTime } from "@/helpers/formatTime";
import React from "react";

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
   return (
      <div className="flex flex-col gap-4 px-1 lg:px-8 py-[2px]">
         {messages.map((message, index) => (
            <React.Fragment key={index}>
               {message.type === "incoming" ? (
                  <IncomingMessageBubble
                     key={message.id}
                     text={message.text}
                     timeStamp={formatTime(message.timestamp)}
                     borderRadius={borderRadius} // Apply the border radius
                     isLastMessage={isLastMessage}
                  />
               ) : (
                  <OutgoingMessageBubble
                     key={message.id}
                     text={message.text}
                     timeStamp={formatTime(message.timestamp)}
                     borderRadius={borderRadius} // Apply the border radius
                     isLastMessage={isLastMessage}
                  />
               )}
            </React.Fragment>
         ))}
      </div>
   );
};

export default Messages;
