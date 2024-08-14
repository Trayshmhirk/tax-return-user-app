import Hero from "../components/Hero";
import { BsCardChecklist } from "react-icons/bs";
import TodoCard from "../components/TodoCard";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineAddCard } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";

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
               <div className="flex flex-wrap gap-3">
                  <TodoCard
                     todoIcon={BsCardChecklist}
                     text="Request service"
                     handleClick={() => navigate("request-service")}
                  />
                  <TodoCard
                     todoIcon={IoCloudUploadOutline}
                     text="Upload pdf or image"
                     handleClick={() => navigate("upload-document")}
                  />
                  <TodoCard
                     todoIcon={MdOutlineAddCard}
                     text="Integrate bank account"
                     handleClick={() => navigate("add-card")}
                  />
               </div>
            </div>

            <div className="flex flex-col gap-3">
               <div className="flex justify-between items-center">
                  <p className="font-medium md:text-xl">Transactions</p>
                  <NavLink to={"/credit-cards"} className="font-bold">
                     See all
                  </NavLink>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Home;
