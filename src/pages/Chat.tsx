/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { truncateString } from "@/helpers/truncateString";
import { IoChatbubbles } from "react-icons/io5";
import { Paperclip, Smile, SendHorizontal, ChevronLeft } from "lucide-react";
import Messages from "@/components/chat/Messages";
import useWindowWidth from "@/hooks/UseWindowWidth";

type MessageType = {
   id: string;
   text: string;
   timestamp: string;
   type: "incoming" | "outgoing";
};

type Chats = {
   title: string;
   content: string; // Preview of the last message
   id: string; // Unique identifier for each chat
   messages: MessageType[]; // Array of messages for each chat
};

// type ChatPropType = {
//    title: string;
//    conversations: [];
// };

// type ConversationsPropTypes = {
//    date: string;
// };

// const chat: ChatPropType[] = [
//    {
//       title: "",
//       conversations: [],
//    },
// ];
// const conversations: ConversationsPropTypes[] = [
//    {
//       date: "",
//    },
// ];

const Chat = () => {
   const windowWidth = useWindowWidth();
   const mobileView = windowWidth <= 768;

   const [activeChat, setActiveChat] = useState<Chats | null>(null);
   const [searchInput, setSearchInput] = useState("");
   const [toggleMobileChat, setToggleMobileChat] = useState(false);

   const chats: Chats[] = [
      {
         title: "John Doe",
         content: "Hello, I need help with my account.",
         id: "yadfibadf",
         messages: [
            {
               id: "1",
               text: "Hello, I need help",
               timestamp: "2024-10-17T10:00:00",
               type: "incoming",
            },
            {
               id: "2",
               text: "Sure, I can help.",
               timestamp: "2024-10-17T10:01:00",
               type: "outgoing",
            },
            {
               id: "3",
               text: "Sure, I can help.",
               timestamp: "2024-10-16T10:01:00",
               type: "outgoing",
            },
            {
               id: "4",
               text: "Sure, I can help. what i want you to do for me is that, i would like for you to send in quite a few documents.",
               timestamp: "2024-10-16T10:01:00",
               type: "outgoing",
            },
            {
               id: "5",
               text: "Sure, I can help.",
               timestamp: "2024-10-16T10:01:00",
               type: "incoming",
            },
            {
               id: "6",
               text: "Sure, I can help.",
               timestamp: "2024-10-16T10:01:00",
               type: "outgoing",
            },
         ],
      },
      {
         title: "Jane Smith",
         content: "Can you assist me with this?",
         id: "adfuayr8ef",
         messages: [
            {
               id: "3",
               text: "Can you assist me with this?",
               timestamp: "2024-10-16T09:30:00",
               type: "incoming",
            },
         ],
      },
      {
         title: "Jane Doe",
         content: "I need help with this service?",
         id: "padfnacvh832",
         messages: [
            {
               id: "3",
               text: "Can you assist me with this?",
               timestamp: "2024-10-16T09:30:00",
               type: "incoming",
            },
         ],
      },
      {
         title: "John Doe",
         content: "Hello, I need help with my account.",
         id: "823nfdadfu",
         messages: [
            {
               id: "1",
               text: "Hello, I need help",
               timestamp: "2024-10-17T10:00:00",
               type: "incoming",
            },
            {
               id: "2",
               text: "Sure, I can help.",
               timestamp: "2024-10-17T10:01:00",
               type: "outgoing",
            },
         ],
      },
   ];

   const isChatAccess: string = "on";

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

   const handleOpenChat = (chatId: string) => {
      const selectedChat = chats.find((chat) => chat.id === chatId);
      setActiveChat(selectedChat || null);

      // toggle the mobile chat view
      if (mobileView) {
         setToggleMobileChat(!toggleMobileChat);
      }
   };

   const handleToggleMobileChat = () => {
      setToggleMobileChat(!toggleMobileChat);
   };

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
   };

   const searchSideChats = (user: Chats) => {
      const userName = user.title;
      return userName.toLowerCase().includes(searchInput.toLowerCase());
   };

   const filteredSideChats = chats
      ? chats.filter((chat) => searchSideChats(chat))
      : [];

   return (
      <div className="w-full h-full flex">
         <div className="w-full h-full flex flex-col gap-7">
            <div className="h-full flex gap-4">
               {/* chats aside */}
               <aside
                  className={`w-full md:max-w-[270px] lg:max-w-xs ${toggleMobileChat ? "hidden" : "flex"} flex-col gap-4`}
               >
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
                     {filteredSideChats.length ? (
                        filteredSideChats.map((chat, index) => (
                           <div
                              key={index}
                              className={`
                                 flex items-center justify-between gap-3 bg-cultured hover:bg-antiFlashWhite dark:bg-darkGray hover:dark:bg-eerieBlack p-3 border-b border-b-chineseWhite dark:border-b-spanishGray dark:border-opacity-50 cursor-pointer
                                 ${chat.id === "opened" && "bg-white dark:bg-mutedGray"} 
                              `}
                              onClick={() => handleOpenChat(chat.id)}
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
                        <div className="py-8 px-6">
                           <p className="pending-text text-center">
                              Request a service to begin a chat
                           </p>
                        </div>
                     )}
                  </div>
               </aside>

               <div
                  className={`${toggleMobileChat ? "" : "hidden md:flex"} w-full h-full flex flex-col border border-chineseWhite dark:border-spanishGray rounded-md overflow-hidden`}
               >
                  {activeChat ? (
                     <>
                        <div className="flex items-center justify-center bg-white dark:bg-darkGray border-b border-chineseWhite dark:border-spanishGray">
                           <div className="w-full md:w-[95%] p-3">
                              <div className="flex items-center gap-4">
                                 <div
                                    className={`${!toggleMobileChat && "hidden"}`}
                                    onClick={handleToggleMobileChat}
                                 >
                                    <ChevronLeft />
                                 </div>

                                 <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 flex items-center justify-center bg-richElectricBlue text-white font-semibold rounded-full">
                                       <span className="text-sm">JD</span>
                                       {/* <img src="" alt="" /> */}
                                    </div>

                                    <p className="text-mutedGray dark:text-white font-semibold">
                                       {activeChat.title}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="overflow-scroll w-full h-full flex flex-col gap-3 py-4 pt-5 px-5">
                           {activeChat &&
                              Object.entries(
                                 activeChat.messages.reduce(
                                    (acc, message) => {
                                       // Format timestamp to just the date part
                                       const date = new Date(
                                          message.timestamp
                                       ).toDateString();

                                       // If the date key doesn't exist, create it and add the message
                                       if (!acc[date]) {
                                          acc[date] = [];
                                       }

                                       acc[date].push(message);
                                       return acc;
                                    },
                                    {} as { [date: string]: MessageType[] }
                                 )
                              )
                                 .sort(([dateA], [dateB]) =>
                                    sortDates(dateA, dateB)
                                 )
                                 .map(([date, messages]) => (
                                    <React.Fragment key={date}>
                                       <div className="flex items-center gap-3">
                                          <div className="w-full h-[1px] bg-mutedGray dark:bg-spanishGray opacity-40" />

                                          <p className="w-full lg:w-1/4 text-center text-xs text-mutedGray dark:text-antiFlashWhite">
                                             {date === new Date().toDateString()
                                                ? "Today"
                                                : date}
                                          </p>
                                          <div className="w-full h-[1px] bg-mutedGray dark:bg-spanishGray opacity-40" />
                                       </div>

                                       {/* Display messages for that date */}

                                       {messages.map((message, index) => (
                                          <Messages
                                             key={index}
                                             messages={[message]}
                                          />
                                       ))}
                                    </React.Fragment>
                                 ))}
                           <div className="chat-notifications items-center self-center p-3 hidden">
                              {/* <NotificationMessage 
                                          statusIcon={CheckIcon}
                                          notificationText='Your payment service task has been completed'
                                          notificationAction='Pay now'
                                          isChatNotification
                                          handleNotificationAction={handleShowInvoiceModal}
                                       /> */}
                           </div>
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
