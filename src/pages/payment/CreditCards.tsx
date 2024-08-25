import { NavLink } from "react-router-dom";
import DebitChart from "../../charts/DebitChart";
import DebitCard from "../../components/payment/DebitCard";
import RecentTransactions from "../../components/payment/RecentTransactions";

type InitialCardsProps = {
   id: string;
   name: string;
   last4: string;
   exp: string;
   brand: string;
   cardholderName: string;
   isDefault: boolean;
};

const cards: InitialCardsProps[] = [
   {
      id: "er634e7",
      name: "Debit card",
      last4: "4364",
      exp: "12/22",
      brand: "Visa",
      cardholderName: "John Doe",
      isDefault: false,
   },
   {
      id: "hd2376y",
      name: "Travel card",
      last4: "1234",
      exp: "09/23",
      brand: "Mastercard",
      cardholderName: "Jane Smith",
      isDefault: true,
   },
   {
      id: "ab987hg",
      name: "Work card",
      last4: "3456",
      exp: "10/24",
      brand: "Visa",
      cardholderName: "John Doe",
      isDefault: false,
   },
];

const CreditCards = () => {
   // Only display the first two cards
   const displayedCards = cards.slice(0, 2);

   return (
      <div className="w-full">
         <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="w-full">
               <div className="flex flex-col gap-5 bg-white dark:bg-gray rounded-xl px-5 py-4 shadow-md dark:shadow-md-dark">
                  <div className="flex justify-between items-center gap-3">
                     <div className="text-xl font-semibold">Your cards</div>

                     <NavLink
                        to="/add-card"
                        className="bg-richElectricBlue px-3 py-2 rounded-lg text-white font-medium no-underline shadow-md dark:shadow-md-dark hover-shadow-body"
                     >
                        Add card <span className="font-bold">+</span>
                     </NavLink>
                  </div>

                  <div className="flex flex-col gap-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {displayedCards.map((card) => (
                           <DebitCard key={card.id} card={card} />
                        ))}
                     </div>
                     <button className="self-start text-richElectricBlue font-medium px-3 py-1 shadow-md dark:shadow-md-dark rounded hover-shadow-body">
                        Manage cards
                     </button>
                  </div>
               </div>
            </div>

            <DebitChart />

            {/* Recent Transactions Section */}
            <div className="lg:col-span-2">
               <RecentTransactions />
            </div>
         </div>
      </div>
   );
};

export default CreditCards;
