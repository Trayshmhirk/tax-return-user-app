import HeroTopLeftImage from "../assets/hero-top-left-image.png";
import HeroBottomRightImage from "../assets/hero-bottom-right-image.png";
import GooglePlayImg from "../assets/google-play.png";
import AppStoreImg from "../assets/apple.png";

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
            relative w-full h-56 rounded-2xl bg-richElectricBlue dark:bg-gray text-white
            flex flex-col justify-center items-center gap-5 px-6 overflow-hidden shadow-custom dark:shadow-md-dark
            ${isNotApprovedHome ? "text-center md:h-[270px]" : ""}
         `}
      >
         {/* Hero */}
         {isBankDetails ? (
            <div className="flex flex-col items-center justify-center gap-2">
               <p className="text-xl">{card?.name}</p>
               <div>{card?.brand}</div>
            </div>
         ) : (
            <>
               <img
                  className="absolute top-0 left-0 md:hidden z-0"
                  src={HeroTopLeftImage}
               />
               <img
                  className="absolute bottom-0 right-0 md:hidden z-0"
                  src={HeroBottomRightImage}
               />

               <div className="hidden circle bottom-12 -left-32 md:block z-0" />
               <div className="hidden circle bottom-12 -left-48 md:block z-0" />
               <div className="hidden circle bottom-12 -left-64 md:block z-0" />
               <div className="hidden circle circle-transform top-8 -right-[250px] md:block z-0" />
               <div className="hidden circle circle-transform top-14 -right-[200px] md:block z-0" />
               <div className="hidden circle circle-transform top-20 -right-[150px] md:block z-0" />

               <h1 className="font-medium text-xl z-10 md:text-3xl">{`${isHome ? "Where's my tax return?" : "Your profile is under review"}`}</h1>
            </>
         )}

         {isNotApprovedHome && (
            <p className="w-auto z-10 md:w-96">
               Your profile is being verified by the admin and you would be
               granted access to the app once you are verified
            </p>
         )}

         {isHome && (
            <div className="flex flex-col items-center gap-4 z-10">
               <p className="md:text-xl">Download the IRS app</p>

               <div className="flex gap-3">
                  <div className="flex items-center gap-2 bg-eerieBlack py-[6px] px-3 rounded cursor-pointer hover-shadow-body">
                     <img src={GooglePlayImg} />

                     <div className="flex flex-col">
                        <span className="font-medium text-[7px] md:text-xs">
                           Get it on
                        </span>
                        <p className="font-bold text-[10px] md:text-base">
                           Google Play
                        </p>
                     </div>
                  </div>
                  <div className="flex items-center gap-2 bg-eerieBlack py-[6px] px-3 rounded cursor-pointer hover-shadow-body">
                     <img src={AppStoreImg} />

                     <div className="flex flex-col">
                        <span className="font-medium text-[7px] md:text-xs">
                           Download on the
                        </span>
                        <p className="font-bold text-[10px] md:text-base">
                           App Store
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default Hero;
