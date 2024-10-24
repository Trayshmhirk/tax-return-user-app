import { MdOutlinePlayCircle } from "react-icons/md";
import WatchImg from "@/assets/watch-small.png";

type VideoCardPropTypes = {
   title: string;
   time: string;
   handleClick: () => void;
};

const VideoCard = ({ title, time, handleClick }: VideoCardPropTypes) => {
   const watchStyle = {
      background: `url(${WatchImg})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
   };

   return (
      <div
         onClick={handleClick}
         className="calc-width-two flex flex-col bg-white dark:bg-gray rounded-lg cursor-pointer shadow-md dark:shadow-md-dark hover-shadow-body md:w-64"
      >
         <div className="relative h-14 text-white md:h-24" style={watchStyle}>
            <div className="absolute bottom-3 left-6 flex items-center gap-3">
               <MdOutlinePlayCircle className="w-6 h-6" />
               <p className="font-medium">Watch</p>
            </div>
         </div>

         <div className="px-4 py-3">
            <p className="text-sm md:text-base">{title}</p>
            <p className="text-xs md:text-sm">{time}</p>
         </div>
      </div>
   );
};

export default VideoCard;
