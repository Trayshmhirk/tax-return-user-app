import Hero from "@/components/home/Hero";
import { BsCardChecklist } from "react-icons/bs";
import TodoCard from "@/components/cards/TodoCard";
import { IoCloudUploadOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import RequestServiceDialog from "@/components/modal/RequestServiceDialog";

const Home = () => {
   const navigate = useNavigate();

   return (
      <div className="flex flex-col gap-6">
         <Hero isHome />

         <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
               <span className="font-medium md:text-xl">
                  What would you like to do?
               </span>
               <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                  <RequestServiceDialog>
                     <button>
                        <TodoCard
                           todoIcon={BsCardChecklist}
                           text="Request service"
                           handleClick={() => {}}
                        />
                     </button>
                  </RequestServiceDialog>
                  <TodoCard
                     todoIcon={IoCloudUploadOutline}
                     text="Upload pdf or image"
                     handleClick={() => navigate("upload-documents")}
                  />
               </div>
            </div>

            <div className="flex flex-col gap-3">
               <div className="flex justify-between items-center">
                  <p className="font-medium md:text-xl">Transactions</p>
                  <NavLink to={"/bank"} className="font-bold">
                     See all
                  </NavLink>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Home;
