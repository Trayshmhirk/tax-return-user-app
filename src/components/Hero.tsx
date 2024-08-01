type HeroProps = {
   isNotApprovedHome?: boolean;
   isHome?: boolean;
   isBankDetails?: boolean;
   card?: {
      name: string;
      brand: string;
   };
};

const Hero = ({
   isNotApprovedHome,
   isHome,
   isBankDetails,
   card,
}: HeroProps) => {
   return (
      <div
         className={`
            relative w-full h-52 rounded-2xl bg-richElectricBlue dark:bg-gray text-richBlack dark:text-white
            flex flex-col justify-center items-center gap-4 overflow-hidden shadow-custom-dark
            ${isNotApprovedHome ? "text-center md:h-[270px]" : ""}
         `}
      >
         <>
            <img className="top-left" src={"HeroTopLeftImage"} />
            <img className="bottom-right" src={"HeroBottomRightImage"} />
            //
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
            <div className="circle circle-3"></div>
            <div className="circle circle-4"></div>
            <div className="circle circle-5"></div>
            <div className="circle circle-6"></div>
         </>

         {isBankDetails ? (
            <div className="bank-details flex flex-col items-center justify-center gap-2">
               <p className="bank-name">{card?.name}</p>
               <div>{card?.brand}</div>
            </div>
         ) : (
            <h1 className="font-medium">{`${isHome ? "Where's my tax return?" : "Your profile is under review"}`}</h1>
         )}
         {isNotApprovedHome && (
            <p>
               Your profile is being verified by the admin and you would be
               granted access to the app once you are verified
            </p>
         )}
         {isHome && (
            <div className="flex flex-col items-center gap-3">
               <p className="irs">Download the IRS app</p>

               <div className="flex gap-3">
                  <div className="irs-download flex items-center gap-2">
                     <img src={"GooglePlayImg"} />

                     <div className="flex flex-col">
                        <span className="font-medium">Get it on</span>
                        <p className="font-bold">Google Play</p>
                     </div>
                  </div>
                  <div className="irs-download flex items-center gap-2">
                     <img src={"AppStoreImg"} />

                     <div className="flex flex-col">
                        <span className="font-medium">Download on the</span>
                        <p className="font-bold">App Store</p>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default Hero;
