/* eslint-disable @typescript-eslint/no-explicit-any */

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { truncateString } from "@/helpers/truncateString";
import { IoChatbubbles } from "react-icons/io5";
import React, { useState } from "react";

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

const LiveChat = () => {
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

   const isChatAccess = "off";

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
                                 flex items-center justify-between gap-3 bg-cultured hover:bg-antiFlashWhite dark:bg-darkGray hover:dark:bg-eerieBlack p-3 border-b border-b-chineseWhite dark:border-b-spanishGray cursor-pointer
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

               <div className="hidden md:flex w-full h-full flex-col items-center justify-center border border-spanishGray rounded-md">
                  {chat.length ? (
                     <>
                        {chat.map((chat, index) => (
                           <React.Fragment>
                              <div className="px-5 py-2">{chat.title}</div>
                              <div className="chat-body overflow-scroll w-100 d-flex flex-column pt-4 px-4 gap-4">
                                 {activeChat &&
                                    Object.entries(
                                       conversations[activeChat] ?? {}
                                    )
                                       .sort(([dateA], [dateB]) =>
                                          sortDates(dateA, dateB)
                                       )
                                       .map(([date /*messages*/]) => (
                                          <React.Fragment key={date}>
                                             <div className="d-flex align-items-center gap-3">
                                                {/* <Line isChat /> */}
                                                <p className="w-25 text-center">
                                                   {date}
                                                </p>
                                                {/* <Line isChat /> */}
                                             </div>

                                             <div key={index} className="">
                                                {/* <ChatMessages
                                                   messages={messages}
                                                /> */}
                                             </div>
                                          </React.Fragment>
                                       ))}
                                 {/* <div className='chat-notifications d-flex align-items-center align-self-center p-3'>
                                                <NotificationMessage 
                                                   statusIcon={CheckIcon}
                                                   notificationText='Your payment service task has been completed'
                                                   notificationAction='Pay now'
                                                   isChatNotification
                                                   handleNotificationAction={handleShowInvoiceModal}
                                                />
                                             </div> */}
                              </div>

                              {isChatAccess === "off" ? (
                                 <div className="chat-disabled d-flex justify-content-center text-center">
                                    This chat has been disabled by the admin.
                                    Kindly check back later.
                                 </div>
                              ) : (
                                 <div className="chat-foot d-flex align-items-center gap-3 rounded-1">
                                    <img
                                    // src={AttachFileIcon}
                                    // onClick={handleInsertFileModal}
                                    />

                                    <div className="text w-100 d-flex justify-content-between rounded-2">
                                       <input
                                          className="w-75"
                                          type="text"
                                          // placeholder="Type your message"
                                          // value={inputMessage}
                                          // onChange={handleInputChange}
                                          // onKeyDown={handleKeyPress}
                                       />

                                       <img
                                       // src={SendIcon}
                                       // onClick={handleSend}
                                       />
                                    </div>
                                 </div>
                              )}
                           </React.Fragment>
                        ))}
                     </>
                  ) : (
                     <div className="chat-box w-100 h-100 d-flex align-items-center justify-content-center">
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

export default LiveChat;
