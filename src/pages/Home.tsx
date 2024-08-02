import Hero from "../components/Hero";
import { BsCardChecklist } from "react-icons/bs";
import TodoCard from "../components/TodoCard";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineAddCard } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Home = () => {
   const navigate = useNavigate();

   return (
      <div className="flex flex-col gap-8">
         <Hero isHome />

         <div className="flex flex-col gap-4">
            <span className="font-medium text-xl">
               What would you like to do?
            </span>

            <div className="flex flex-wrap justify-between gap-3">
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
                  handleClick={() => navigate("add-new-bank")}
               />
               <TodoCard
                  todoIcon={MdErrorOutline}
                  text="Tax notice"
                  handleClick={() => navigate("tax-notice")}
               />
            </div>
         </div>
      </div>
   );
};

export default Home;
