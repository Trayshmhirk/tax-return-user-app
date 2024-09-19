import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { truncateString } from "@/helpers/truncateString";

type Chats = {
   title: string;
   content: string;
};

const LiveChat = () => {
   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      e;
   };

   const filterSideChats: Chats[] = [
      {
         title: "John Doe",
         content: "Hello, I need help with my account.",
      },
   ];

   return (
      <div className="w-full h-full flex">
         <div className="w-full h-full flex flex-col gap-7">
            <div className="h-full flex gap-4">
               {/* chats aside */}
               <aside className="max-w-xs w-full flex flex-col gap-2">
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

                  <div className="overflow-scroll h-full flex flex-col gap-2 p-4 bg-white dark:bg-gray rounded-md">
                     {filterSideChats.length ? (
                        filterSideChats.map((chat, index) => (
                           <div
                              key={index}
                              className="flex items-center gap-1"
                              // onClick={() => handleOpenChat(chat.service_id)}
                           >
                              <div>
                                 <div className="flex justify-center items-center font-bold">
                                    {/* <img src={ChatsIcon} /> */}
                                 </div>
                              </div>

                              <div className="user-message w-full flex flex-col gap-1">
                                 <p className="font-medium text-mutedGray dark:text-white">
                                    {truncateString(chat.title, 20)}
                                 </p>
                                 <span className="text-spanishGray text-sm">
                                    {truncateString(chat.content, 50)}
                                 </span>
                              </div>

                              <div className=""></div>
                           </div>
                        ))
                     ) : (
                        <p className="pending-text text-center">
                           Request a service to begin a chat
                        </p>
                     )}
                  </div>
               </aside>

               <div className="w-full h-full flex flex-col items-center justify-center border border-spanishGray rounded-md">
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
