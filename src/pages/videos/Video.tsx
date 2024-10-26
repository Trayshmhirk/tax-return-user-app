import { useNavigate } from "react-router-dom";
import WatchImg from "@/assets/watch-large.png";
import { MdOutlinePlayCircle } from "react-icons/md";
import VideoCard from "@/components/cards/VideoCard";
import { videoData } from "@/mocks/MockData";
import { useVideoContext } from "@/hooks/useVideoContext";
import { VideoDataTypes } from "@/types/Types";

const Video = () => {
   const navigate = useNavigate();
   const { currentVideo, setCurrentVideo } = useVideoContext();

   // Find sibling videos in the same category
   const siblingVideos = videoData.filter(
      (video) =>
         video.category === currentVideo.category &&
         video.id !== currentVideo.id
   );

   // Navigate to the "Watch Video" route and pass the title as a parameter
   const handleSelectVideo = (video: VideoDataTypes) => {
      setCurrentVideo(video);
      navigate(`/knowledge-base/video/${video.id}`);
   };

   return (
      <div className="w-full flex flex-col self-center gap-7">
         <h3 className="text-xl font-medium">{<p>{currentVideo.title}</p>}</h3>

         <div className="flex flex-col gap-3">
            <div
               className="relative min-h-52 md:min-h-64 h-full w-full flex justify-center items-center rounded-lg cursor-pointer md:h-56"
               style={{
                  background: `url(${WatchImg})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
               }}
            >
               <div className="flex items-center gap-2">
                  <div className="flex justify-center items-center p-1">
                     <MdOutlinePlayCircle className="w-6 h-6" />
                  </div>
                  <span className="font-bold">Watch full video</span>
               </div>
            </div>
            <p className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-mutedGray dark:text-white">
               <span>Uploaded: {currentVideo.date_uploaded}</span>

               <span>Duration: {currentVideo.duration}</span>
            </p>
         </div>

         <div className="flex flex-col gap-3">
            <h5 className="font-medium">Brief description</h5>
            <p className="text-sm">{currentVideo.description}</p>
         </div>

         <div className="flex flex-col gap-3">
            <h4 className="font-medium">Coming up</h4>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
               {siblingVideos.map((video) => (
                  <VideoCard
                     key={video.id}
                     video={video}
                     handleClick={() => handleSelectVideo(video)}
                  />
               ))}
            </div>
         </div>
      </div>
   );
};

export default Video;
