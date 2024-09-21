import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { truncateString } from "@/helpers/truncateString";
import { IoChatbubbles } from "react-icons/io5";

type Chats = {
   title: string;
   content: string;
   id: string;
};

const LiveChat = () => {
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
                  <p className="pending-text">
                     Click on a chat to begin conversation
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default LiveChat;
