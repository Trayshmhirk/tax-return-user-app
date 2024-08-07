import Hero from "../components/Hero";
import { BsCardChecklist } from "react-icons/bs";
import TodoCard from "../components/TodoCard";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineAddCard } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import FilingCard from "../components/FilingCard";

type CardType = {
   id: number;
   cardName: string;
   cardNumber: number;
   cardText: string;
   color: string;
};

const filings: CardType[] = [
   {
      id: 1,
      cardName: "Filing",
      cardNumber: 345273,
      cardText: "6th Aug, 2024",
      color: "#62C3DB",
   },
   {
      id: 2,
      cardName: "Filing",
      cardNumber: 453682,
      cardText: "6th Aug, 2024",
      color: "#0F6074",
   },
   {
      id: 3,
      cardName: "Filing",
      cardNumber: 346864,
      cardText: "6th Aug, 2024",
      color: "#121212",
   },
];

const Home = () => {
   const navigate = useNavigate();

   const handleOpenFIling = () => {
      navigate("/previous-filing/otp-verification");
   };

   return (
      <div className="flex flex-col gap-7">
         <Hero isHome />

         <div className="flex flex-col gap-4">
            <span className="font-medium md:text-xl">
               What would you like to do?
            </span>

            <div className="flex flex-wrap gap-3 xl:justify-between">
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

            <div className="flex flex-col gap-4">
               <div className="flex justify-between items-center">
                  <p className="font-medium md:text-xl">Previous Filing</p>
                  <NavLink to={"/previous-filing"} className="font-bold">
                     See all
                  </NavLink>
               </div>

               <div className="flex flex-wrap gap-4">
                  {filings.length ? (
                     <>
                        {filings.map((filing, index) => (
                           <FilingCard
                              key={index}
                              card={filing}
                              handleClick={handleOpenFIling}
                              // color={colorPalette[index % colorPalette.length]}
                              color={filing.color}
                              cardName={filing.cardName}
                              cardNumber={filing.cardNumber}
                              cardText={filing.cardText}
                           />
                        ))}
                     </>
                  ) : (
                     <p className="w-100 pending-text text-center">
                        No previous filings to show here
                     </p>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Home;
