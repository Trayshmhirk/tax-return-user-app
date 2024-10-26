import { useNavigate, useParams } from "react-router-dom";
import WatchImg from "@/assets/watch-large.png";
import { MdOutlinePlayCircle } from "react-icons/md";
import VideoCard from "@/components/cards/VideoCard";
import { videoData } from "@/mocks/MockData";

const Video = () => {
   const navigate = useNavigate();
   const { videoId } = useParams();

   const watchStyle = {
      background: `url(${WatchImg})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
   };

   // Work flow would be to use video id to make a get request from the api and get the video data
   // Find the selected video based on the videoId
   const selectedVideo = videoData.find((video) => video.id === videoId);

   // if (!videoId || !selectedVideo) return;

   // Find sibling videos in the same category
   const siblingVideos = videoData.filter(
      (video) => video.category === selectedVideo?.category
   );

   // Navigate to the "Watch Video" route and pass the title as a parameter
   const handleSelectVideo = (videoId: string) => {
      navigate(`/knowledge-base/video/${videoId}`);
   };

   return (
      <div className="flex flex-col gap-9">
         {" "}
         <div className="w-full flex flex-col self-center gap-4 md:w-[600px] lg:w-[800px] xl:w-[1000px]">
            <h3 className="text-xl font-medium">
               {<p>{selectedVideo?.title}</p>}
            </h3>

            <div className="flex flex-col gap-2">
               <div
                  className="relative h-40 w-full flex justify-center items-center rounded-lg cursor-pointer md:h-56"
                  style={watchStyle}
               >
                  <div className="flex items-center gap-2">
                     <div className="flex justify-center items-center p-1">
                        <MdOutlinePlayCircle className="w-6 h-6" />
                     </div>
                     <span className="font-bold">Watch full video</span>
                  </div>
               </div>
               <p className="text-sm text-mutedGray dark:text-white">
                  {selectedVideo?.date_uploaded}
               </p>
            </div>

            <div className="flex flex-col gap-2">
               <h5 className="font-medium text-lg">Brief description</h5>
               <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Corporis quos dicta quasi praesentium, natus, sapiente labore
                  accusantium, nesciunt nostrum reprehenderit doloribus nihil
                  iusto inventore porro repellendus. Earum soluta veniam dolorum
                  fuga, minus aperiam debitis possimus animi alias assumenda
                  sint vero aspernatur ratione blanditiis eius. Reiciendis
                  libero voluptatum architecto, fugiat provident accusantium
                  deleniti quas, sapiente nam ab quia. Cum id facere quibusdam
                  reiciendis culpa possimus consectetur quis. Eligendi quidem
                  fugit mollitia cum alias aliquam sit hic, laborum, officia,
                  numquam fugiat vel at! Esse quaerat unde dignissimos
                  voluptates non. Vero id, magni veniam animi fuga odio neque
                  esse deleniti praesentium? Necessitatibus dicta repudiandae ex
                  aut distinctio voluptatum quis quibusdam temporibus
                  repellendus culpa inventore ut fugiat minus velit rem,
                  laboriosam rerum incidunt delectus deserunt exercitationem.
                  Odit illo atque laborum distinctio in dolorum adipisci at
                  aspernatur vero rerum. Nostrum, consectetur nobis. Provident
                  perferendis nemo iusto, ab eveniet eos cumque, sequi debitis
                  atque dolore sunt?
               </p>
            </div>

            <div className="flex flex-col gap-4 mb-4">
               <h4 className="font-medium">Coming up</h4>
               <div className="flex flex-wrap gap-3">
                  {siblingVideos.map(
                     (video) =>
                        video.id !== videoId && (
                           <VideoCard
                              key={video.id}
                              video={video}
                              handleClick={() => handleSelectVideo(video.id)}
                           />
                        )
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Video;
