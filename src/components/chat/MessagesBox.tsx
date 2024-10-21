import React, { useLayoutEffect, useRef } from "react";
import IncomingMessageBubble from "./IncomingMessageBubble";
import OutgoingMessageBubble from "./OutgoingMessageBubble";
import { MessagesPropType } from "@/types/Types";
import { formatTime } from "@/helpers/formatTime";
import { isYesterday, isToday } from "date-fns";
import { sortDates } from "@/helpers/sortDates";
import {
   groupMessagesByType,
   groupAndSortMessages,
} from "@/helpers/chatHelpers";

type MessagesBoxPropTypes = {
   messages: MessagesPropType[]; // Array of message objects
};

const MessagesBox = ({ messages }: MessagesBoxPropTypes) => {
   const chatEndRef = useRef<HTMLDivElement | null>(null);

   useLayoutEffect(() => {
      if (chatEndRef.current) {
         chatEndRef.current.scrollTop = chatEndRef.current.scrollHeight;
      }
   }, [messages]);

   return (
      <div
         ref={chatEndRef}
         className="overflow-scroll w-full h-full flex flex-col gap-5 bg-lightGray dark:bg-eerieBlack py-4 pt-5 px-5"
      >
         {
            // group messages by date and sort by their timestamp within the date
            groupAndSortMessages(messages)
               .sort(([dateA], [dateB]) => sortDates(dateA, dateB))
               .map(([date, messages]) => (
                  <React.Fragment key={date}>
                     <div className="flex items-center justify-center">
                        <div className="px-4 py-1 bg-spanishGray dark:bg-gray text-center text-xs font-medium text-white dark:text-antiFlashWhite rounded-md">
                           {isToday(new Date(date))
                              ? "Today"
                              : isYesterday(new Date(date))
                                ? "Yesterday"
                                : date}
                        </div>
                     </div>

                     {/* Group messages of the same type (incoming/outgoing) together */}
                     {groupMessagesByType(messages).map((group, index) => (
                        <div key={index} className="flex flex-col">
                           {group.map((message, msgIndex) => {
                              // Check if this is the last message in the group
                              const isLastMessage =
                                 msgIndex === group.length - 1;

                              // Determine border radius for the last message in the group
                              const borderRadius =
                                 message.type === "incoming"
                                    ? isLastMessage
                                       ? "8px 8px 8px 0px"
                                       : "8px"
                                    : isLastMessage
                                      ? "8px 8px 0px 8px"
                                      : "8px";

                              return (
                                 <div
                                    key={msgIndex}
                                    className="flex flex-col gap-4 px-1 lg:px-8 py-[2px]"
                                 >
                                    {message.type === "incoming" ? (
                                       <IncomingMessageBubble
                                          key={message.id}
                                          text={message.text}
                                          timeStamp={formatTime(
                                             message.timestamp
                                          )}
                                          borderRadius={borderRadius} // Apply the border radius
                                          isLastMessage={isLastMessage}
                                       />
                                    ) : (
                                       <OutgoingMessageBubble
                                          key={message.id}
                                          text={message.text}
                                          timeStamp={formatTime(
                                             message.timestamp
                                          )}
                                          borderRadius={borderRadius} // Apply the border radius
                                          isLastMessage={isLastMessage}
                                       />
                                    )}
                                 </div>
                              );
                           })}
                        </div>
                     ))}
                  </React.Fragment>
               ))
         }
      </div>
   );
};

export default MessagesBox;
