import { useParams } from "react-router-dom";

const Video = () => {
   const { videoId } = useParams();

   return <div>Video {videoId}</div>;
};

export default Video;
