import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { truncateString } from "@/helpers/truncateString";
import { IoChatbubbles } from "react-icons/io5";
import { Paperclip, Smile, SendHorizontal, ChevronLeft } from "lucide-react";
import Messages from "@/components/chat/Messages";
import { isYesterday, isToday } from "date-fns";
import { sortDates } from "@/helpers/sortDates";
import { ChatsPropType, ChatAccessStatus } from "@/types/Types";
import { fetchChats } from "@/api/mockApis";
import { useMobileChatToggle } from "@/hooks/useMobileChatToggle";
import { groupMessagesByType } from "@/helpers/groupMessagesByType";
import { groupAndSortMessages } from "@/helpers/groupAndSortMessages";

const Chat = () => {
   const {
      mobileView,
      toggleMobileChat,
      setToggleMobileChat,
      handleToggleMobileChat,
   } = useMobileChatToggle();

   const [chats, setChats] = useState<ChatsPropType[]>([]);
   const [activeChat, setActiveChat] = useState<ChatsPropType | null>(null);
   const [searchInput, setSearchInput] = useState("");

   useEffect(() => {
      async function fetchData() {
         // setLoading(true);

         setTimeout(async () => {
            const fetchedChats = await fetchChats();
            setChats(fetchedChats);
            // setLoading(false);
         }, 500);
      }
      fetchData();
   }, []);

   const handleOpenChat = (chatId: string) => {
      /*
         call api to get the selected chat by the "service id",
         and then set the response data to the activechat
      */
      const selectedChat = chats.find((chat) => chat.id === chatId);
      setActiveChat(selectedChat || null);

      // toggle the mobile chat view
      if (mobileView) {
         setToggleMobileChat(!toggleMobileChat);
      }
   };

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
   };

   const searchSideChats = (user: ChatsPropType) => {
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

                        <div className="overflow-scroll w-full h-full flex flex-col gap-5 bg-lightGray dark:bg-eerieBlack py-4 pt-5 px-5">
                           {activeChat &&
                              // group messages by date and sort by their timestamp within the date
                              groupAndSortMessages(activeChat.messages)
                                 .sort(([dateA], [dateB]) =>
                                    sortDates(dateA, dateB)
                                 )
                                 .map(([date, messages]) => (
                                    <React.Fragment key={date}>
                                       <div className="flex items-center justify-center">
                                          <div className="px-4 py-1 bg-americanSilver dark:bg-gray text-center text-xs font-medium text-white dark:text-antiFlashWhite rounded-md">
                                             {isToday(new Date(date))
                                                ? "Today"
                                                : isYesterday(new Date(date))
                                                  ? "Yesterday"
                                                  : date}
                                          </div>
                                       </div>

                                       {/* Group messages of the same type (incoming/outgoing) together */}
                                       {groupMessagesByType(messages).map(
                                          (group, index) => (
                                             <div
                                                key={index}
                                                className="flex flex-col"
                                             >
                                                {group.map(
                                                   (message, msgIndex) => {
                                                      // Check if this is the last message in the group
                                                      const isLastMessage =
                                                         msgIndex ===
                                                         group.length - 1;

                                                      // Determine border radius for the last message in the group
                                                      const borderRadiusStyle =
                                                         message.type ===
                                                         "incoming"
                                                            ? isLastMessage
                                                               ? "8px 8px 8px 0px"
                                                               : "8px"
                                                            : isLastMessage
                                                              ? "8px 8px 0px 8px"
                                                              : "8px";

                                                      return (
                                                         <Messages
                                                            key={message.id}
                                                            messages={[message]} // Pass the individual message
                                                            borderRadius={
                                                               borderRadiusStyle
                                                            } // Pass the calculated border radius
                                                            isLastMessage={
                                                               isLastMessage
                                                            }
                                                         />
                                                      );
                                                   }
                                                )}
                                             </div>
                                          )
                                       )}
                                    </React.Fragment>
                                 ))}
                        </div>

                        <div className="flex items-center gap-4 bg-white dark:bg-darkGray border-t border-chineseWhite dark:border-spanishGray px-6 py-4">
                           {activeChat.chat_access === ChatAccessStatus.OFF ? (
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

                                 <div className="text w-full flex items-center justify-between gap-4">
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
