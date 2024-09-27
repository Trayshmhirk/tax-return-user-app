/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { truncateString } from "@/helpers/truncateString";
import { IoChatbubbles } from "react-icons/io5";
import { Paperclip, Smile, SendHorizontal } from "lucide-react";

type Chats = {
   title: string;
   content: string;
   id: string;
};

type ChatPropType = {
   title: string;
   conversations: [];
};

type ConversationsPropTypes = {
   date: string;
};

const Chat = () => {
   const [activeChat] = useState(null);

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      e;
   };

   const filterSideChats: Chats[] = [
      {
         title: "John Doe",
         content: "Hello, I need help with my account.",
         id: "opened",
      },
      {
         title: "John Doe",
         content: "Hello, I need help with my account.",
         id: "",
      },
      {
         title: "John Doe",
         content: "Hello, I need help with my account.",
         id: "",
      },
      {
         title: "John Doe",
         content: "Hello, I need help with my account.",
         id: "",
      },
      {
         title: "John Doe",
         content: "Hello, I need help with my account.",
         id: "",
      },
      {
         title: "John Doe",
         content: "Hello, I need help with my account.",
         id: "",
      },
   ];

   const chat: ChatPropType[] = [
      {
         title: "",
         conversations: [],
      },
   ];
   const conversations: ConversationsPropTypes[] = [
      {
         date: "",
      },
   ];

   const isChatAccess: string = "off";

   // Sort function for dates
   const sortDates = (dateA: string, dateB: string) => {
      const dateOrder = ["yesterday", "today"];

      const indexA = dateOrder.indexOf(dateA.toLowerCase());
      const indexB = dateOrder.indexOf(dateB.toLowerCase());

      if (indexA === -1 && indexB === -1) {
         // If both dates are not in the predefined order, compare them as normal dates
         // return new Date(dateA) - new Date(dateB);
      }

      // If one of the dates is not in the predefined order, prioritize it
      return indexA - indexB;
   };

   return (
      <div className="w-full h-full flex">
         <div className="w-full h-full flex flex-col gap-7">
            <div className="h-full flex gap-4">
               {/* chats aside */}
               <aside className="w-full md:max-w-[270px] lg:max-w-xs flex flex-col gap-4">
                  <label
                     htmlFor="search"
                     className="w-full h-10 flex items-center bg-white dark:bg-gray p-3 px-4 rounded shadow-md dark:shadow-md-dark"
                  >
                     <Search className="w-4 h-4 dark:text-white" />
                     <Input
                        id="search"
                        type="text"
                        placeholder="Search"
                        className="bg-transparent dark:bg-transparent border-none outline-none"
                        onChange={handleSearch}
                     />
                  </label>

                  <div className="overflow-scroll h-full flex flex-col bg-white dark:bg-gray rounded-md shadow-md dark:shadow-md-dark">
                     {filterSideChats.length ? (
                        filterSideChats.map((chat, index) => (
                           <div
                              key={index}
                              className={`
                                 flex items-center justify-between gap-3 bg-cultured hover:bg-antiFlashWhite dark:bg-darkGray hover:dark:bg-eerieBlack p-3 border-b border-b-chineseWhite dark:border-b-spanishGray dark:border-opacity-50 cursor-pointer
                                 ${chat.id === "opened" && "bg-white dark:bg-mutedGray"} 
                              `}
                              // onClick={() => handleOpenChat(chat.service_id)}
                           >
                              <div className="flex items-center gap-2">
                                 <div className="flex justify-center items-center font-bold">
                                    <IoChatbubbles className="text-lg text-richElectricBlue" />
                                 </div>

                                 <div className="w-full flex flex-col gap-[2px]">
                                    <p className="font-medium text-mutedGray dark:text-white">
                                       {truncateString(chat.title, 15)}
                                    </p>
                                    <span className="text-spanishGray text-xs">
                                       {truncateString(chat.content, 30)}
                                    </span>
                                 </div>
                              </div>

                              <div className="flex flex-col gap-2 items-end">
                                 <span className="text-[10px] font-medium text-spanishGray">
                                    5 mins
                                 </span>
                                 <div className="w-fit px-[6.5px] py-[2px] rounded-full bg-red-500 dark:bg-red-600 text-[10px] text-white font-medium">
                                    5
                                 </div>
                              </div>
                           </div>
                        ))
                     ) : (
                        <p className="pending-text text-center">
                           Request a service to begin a chat
                        </p>
                     )}
                  </div>
               </aside>

               <div className="hidden md:flex w-full h-full flex-col border border-chineseWhite dark:border-spanishGray rounded-md overflow-hidden">
                  {chat.length ? (
                     <>
                        {chat.map((chat, index) => (
                           <React.Fragment key={index}>
                              <div className="flex items-center justify-center bg-white dark:bg-darkGray border-b border-chineseWhite dark:border-spanishGray">
                                 <div className="w-[95%] p-3">
                                    <div className="flex items-center gap-3">
                                       <div className="w-8 h-8 flex items-center justify-center bg-richElectricBlue text-white font-semibold rounded-full">
                                          <span className="text-sm">JD</span>
                                          {/* <img src="" alt="" /> */}
                                       </div>

                                       <p className="text-mutedGray dark:text-white font-semibold">
                                          {chat.title}
                                          John Doe
                                       </p>
                                    </div>
                                 </div>
                              </div>

                              <div className="overflow-scroll w-full h-full flex flex-col gap-4 pt-4 px-4">
                                 {activeChat &&
                                    Object.entries(
                                       conversations[activeChat] ?? {}
                                    )
                                       .sort(([dateA], [dateB]) =>
                                          sortDates(dateA, dateB)
                                       )
                                       .map(([date /*messages*/]) => (
                                          <React.Fragment key={date}>
                                             <div className="flex items-center gap-3">
                                                <div className="w-full h-[1px] bg-eerieBlack dark:bg-white opacity-40" />

                                                <p className="w-1/4 text-center">
                                                   {date}
                                                   Today
                                                </p>
                                                <div className="w-full h-[1px] bg-eerieBlack dark:bg-white opacity-40" />
                                             </div>

                                             <div className="">
                                                {/* <ChatMessages
                                                messages={messages}
                                             /> */}
                                             </div>
                                          </React.Fragment>
                                       ))}
                                 {/* <div className='chat-notifications flex items-center self-center p-3'>
                                       <NotificationMessage 
                                          statusIcon={CheckIcon}
                                          notificationText='Your payment service task has been completed'
                                          notificationAction='Pay now'
                                          isChatNotification
                                          handleNotificationAction={handleShowInvoiceModal}
                                       />
                                    </div> */}
                              </div>

                              <div className="flex items-center gap-4 bg-white dark:bg-darkGray border-t border-chineseWhite dark:border-spanishGray px-6 py-4">
                                 {isChatAccess === "off" ? (
                                    <p className="w-full p-2 text-mutedGray dark:text-spanishGray text-center">
                                       This chat has been disabled by the admin.
                                       Kindly check back later.
                                    </p>
                                 ) : (
                                    <>
                                       <div className="flex items-center gap-3 text-gray dark:text-white">
                                          <Paperclip
                                             className="w-5 h-5 text-richElectricBlue cursor-pointer"
                                             // onClick={handleInsertFileModal}
                                          />
                                          <div className="w-[37px] h-9 flex items-center justify-center bg-cultured dark:bg-mutedGray text-muted rounded-full cursor-pointer">
                                             <Smile className="w-5 h-5" />
                                          </div>
                                       </div>

                                       <div className="text w-full flex items-center justify-between gap-3">
                                          <Input
                                             className="w-full bg-transparent dark:bg-transparent px-5 rounded dark:border-spanishGray dark:border-opacity-50"
                                             type="text"
                                             placeholder="Type your message"
                                             // value={inputMessage}
                                             // onChange={handleInputChange}
                                             // onKeyDown={handleKeyPress}
                                          />

                                          <div
                                             className="w-[37px] h-9 flex items-center justify-center bg-richElectricBlue text-white p-2 rounded-full cursor-pointer hover-shadow-body"
                                             // onClick={handleSend}
                                          >
                                             <SendHorizontal className="w-5 h-5" />
                                          </div>
                                       </div>
                                    </>
                                 )}
                              </div>
                           </React.Fragment>
                        ))}
                     </>
                  ) : (
                     <div className="w-full h-full flex items-center justify-center">
                        <p className="pending-text">
                           Click on a chat to begin conversation
                        </p>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Chat;
