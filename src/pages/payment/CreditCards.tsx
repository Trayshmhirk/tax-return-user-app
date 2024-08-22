import DebitChart from "../../charts/DebitChart";

const CreditCards = () => {
   return (
      <div className="w-full h-full">
         <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className=""></div>
            <DebitChart />
         </div>
      </div>
   );
};

export default CreditCards;
