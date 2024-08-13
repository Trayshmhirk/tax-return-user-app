import Hero from "../components/Hero";
import { BsCardChecklist } from "react-icons/bs";
import TodoCard from "../components/TodoCard";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineAddCard } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import FilingCard from "../components/FilingCard";
import { filings } from "../mocks/AllMockData";

const Home = () => {
   const navigate = useNavigate();
   const colorPalette = ["#62C3DB", "#0F6074", "#121212"];

   const handleOpenFIling = () => {
      navigate("/previous-filing/otp-verification");
   };

   return (
      <div className="flex flex-col gap-6">
         <Hero isHome />

         <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
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
            </div>

            <div className="flex flex-col gap-3">
               <div className="flex justify-between items-center">
                  <p className="font-medium md:text-xl">Previous Filing</p>
                  <NavLink to={"/previous-filing"} className="font-bold">
                     See all
                  </NavLink>
               </div>

               <div className="flex flex-wrap gap-4 xl:justify-between">
                  {filings.length ? (
                     <>
                        {filings.map((filing, index) => (
                           <FilingCard
                              key={index}
                              card={filing}
                              handleClick={handleOpenFIling}
                              color={colorPalette[index % colorPalette.length]}
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
