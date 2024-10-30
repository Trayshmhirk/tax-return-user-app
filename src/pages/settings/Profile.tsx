import DebitCard from "@/components/payment/DebitCard";
import { cards } from "@/mocks/MockData";
import { Mail, MapPinned, Smartphone, SquarePen } from "lucide-react";
import { differenceInMonths, isPast } from "date-fns";
import { NavLink } from "react-router-dom";

const Profile = () => {
   // Function to get initials from a full name
   const getInitials = (name: string) => {
      const words = name.split(" ");
      const initials = words.map((word) => word.charAt(0));
      return initials.join("").toUpperCase();
   };

   const fullName = "Frank Micheal";
   const initials = getInitials("Frank Micheal");
   const isProfilePicture = true;

   const displayedCards = cards.slice(0, 1);

   return (
      <>
         <h1 className="text-lg font-bold">My Profile</h1>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1fr_2fr_2fr] xl:grid-rows-[2fr-2fr] gap-5">
            <div className="md:col-span-1 lg:col-span-1 xl:row-span-2 h-fit flex flex-col items-center gap-6 px-5 py-6 border border-chineseWhite dark:border-opacity-50 rounded-xl">
               <div className="flex flex-col gap-4 items-center text-center">
                  <div
                     className={`w-40 h-40 flex items-center justify-center ${!isProfilePicture && "bg-brightGray dark:bg-spanishGray text-eerieBlack font-semibold"} rounded-full overflow-hidden shadow-md dark:shadow-md-dark`}
                  >
                     {isProfilePicture ? (
                        <img
                           src="https://i.postimg.cc/TYYNXnXX/IMG-20211003-172636-792.jpg"
                           className="w-full"
                        />
                     ) : (
                        <>{initials}</>
                     )}
                  </div>

                  <div className="flex flex-col gap-2">
                     <p className="text-xl font-bold">{fullName}</p>

                     <p className="bg-richElectricBlue px-3 py-1 rounded-full text-xs font-bold text-white">
                        Individuals
                     </p>
                  </div>
               </div>

               <div className="flex flex-col gap-3 w-full lg:w-fit">
                  <p className="flex items-center gap-2 text-xs font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                     <MapPinned className="w-4 h-4" />
                     Akure, Ondo
                  </p>
                  <p className="flex items-center gap-2 text-xs font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                     <Mail className="w-4 h-4" />
                     Harlex.mikkey@gmail.com
                  </p>
                  <p className="flex items-center gap-2 text-xs font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                     <Smartphone className="w-4 h-4" /> +234 80 5571 2758
                  </p>
               </div>
            </div>

            {/*  */}
            <div className="lg:row-start-2 lg:row-end-3 lg:col-span-3 xl:row-span-1 xl:col-start-2 xl:col-end-3 md:h-fit lg:h-full flex flex-col gap-5 px-5 py-6 border border-chineseWhite dark:border-opacity-50 rounded-xl">
               <div className="flex justify-between gap-4">
                  <h2 className="font-bold">My Profile</h2>

                  <button>
                     <SquarePen className="w-5 h-5 text-mutedGray dark:text-chineseWhite text-opacity-80" />
                  </button>
               </div>

               <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-1">
                     <p className="text-sm font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                        First Name
                     </p>
                     <p className="font-medium">Micheal</p>
                  </div>

                  <div className="flex items-center justify-between gap-1">
                     <p className="text-sm font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                        Last Name
                     </p>
                     <p className="font-medium">Frank</p>
                  </div>

                  <div className="flex items-center justify-between gap-1">
                     <p className="text-sm font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                        Date of birth
                     </p>
                     <p className="font-medium">31st Dec, 2024</p>
                  </div>

                  <div className="flex items-center justify-between gap-1">
                     <p className="text-sm font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                        Gender
                     </p>
                     <p className="font-medium">Male</p>
                  </div>
               </div>
            </div>

            <div className="lg:row-start-4 lg:row-end-5 lg:col-span-3 xl:row-span-2 xl:col-start-2 xl:col-end-3 md:h-fit lg:h-full flex flex-col gap-5 px-5 py-6 border border-chineseWhite dark:border-opacity-50 rounded-xl">
               <div className="flex flex-row justify-between gap-4">
                  <h2 className="font-bold">Address</h2>

                  <button>
                     <SquarePen className="w-5 h-5 text-mutedGray dark:text-chineseWhite text-opacity-80" />
                  </button>
               </div>

               <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-1">
                     <p className="text-sm font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                        Country
                     </p>
                     <p className="font-medium">Nigeria</p>
                  </div>

                  <div className="flex items-center justify-between gap-1">
                     <p className="text-sm font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                        City/state
                     </p>
                     <p className="font-medium">Akure, Ondo</p>
                  </div>

                  <div className="flex items-center justify-between gap-1">
                     <p className="text-sm font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                        Postal code
                     </p>
                     <p className="font-medium">105690</p>
                  </div>

                  <div className="flex items-center justify-between gap-1">
                     <p className="text-sm font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                        Tax ID
                     </p>
                     <p className="font-medium">Wd638H748</p>
                  </div>
               </div>
            </div>

            <div className="lg:row-start-5 lg:row-end-6 lg:col-span-2 xl:row-start-1 xl:row-end-4 xl:col-start-3 xl:col-end-4 flex flex-col gap-5 px-5 py-6 border border-chineseWhite dark:border-opacity-50 rounded-xl">
               <h2 className="font-bold">Preferred Payment method</h2>

               {/* Cards list */}
               <div className="sm:max-w-[320px] md:max-w-full xl:max-w-[320px]">
                  {displayedCards.map((card) => (
                     <DebitCard key={card.id} card={card} />
                  ))}
               </div>

               {/* Card Details */}
               <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3">
                     <h3 className="font-semibold text-xl">Card Details</h3>
                     <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-1">
                           <p className="text-sm font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                              Cardholder:{" "}
                           </p>
                           <span className="font-medium">
                              {displayedCards[0].cardholderName}
                           </span>
                        </div>
                        <div className="flex items-center justify-between gap-1">
                           <p className="text-sm font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                              Brand:{" "}
                           </p>
                           <p className="font-medium">
                              {displayedCards[0].brand}
                           </p>
                        </div>
                        <div className="flex items-center justify-between gap-1">
                           <p className="text-sm font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                              Expiry:{" "}
                           </p>
                           <p className="font-medium">
                              {displayedCards[0].exp}{" "}
                              {isExpired(displayedCards[0].exp) ? (
                                 <span className="text-bostonRed dark:text-red-500">
                                    (Expired!)
                                 </span>
                              ) : isExpiringSoon(displayedCards[0].exp) ? (
                                 <span className="text-yellow-500">
                                    (Expiring Soon!)
                                 </span>
                              ) : null}
                           </p>
                        </div>
                        <div className="flex items-center justify-between gap-1">
                           <p className="text-sm font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                              Last 4 Digits:{" "}
                           </p>
                           <p className="font-medium">
                              **** **** **** {displayedCards[0].last4}
                           </p>
                        </div>
                     </div>
                  </div>

                  <NavLink
                     to="/bank"
                     className="bg-richElectricBlue text-white font-medium px-3 py-1 shadow-md dark:shadow-md-dark rounded text-center no-underline hover-shadow-body"
                  >
                     Manage cards
                  </NavLink>
               </div>
            </div>
         </div>
      </>
   );
};

export default Profile;

// Function to check if a card is expired
const isExpired = (exp: string): boolean => {
   const [month, year] = exp.split("/");
   const expDate = new Date(parseInt(`20${year}`), parseInt(month) - 1);
   return isPast(expDate);
};

// Function to check if a card is about to expire
const isExpiringSoon = (exp: string): boolean => {
   const [month, year] = exp.split("/");
   const expDate = new Date(parseInt(`20${year}`), parseInt(month) - 1);
   const currentDate = new Date();
   return differenceInMonths(expDate, currentDate) <= 3 && !isPast(expDate);
};
