import { createContext, useState } from "react";
import { VideoDataTypes } from "@/types/Types";

type VideoContextProps = {
   children: React.ReactNode;
};

// Define the type for the context value
type VideoContextState = {
   currentVideo: VideoDataTypes;
   setCurrentVideo: React.Dispatch<React.SetStateAction<VideoDataTypes>>;
};

// Initialize context with default values
const defaultVideo = {
   title: "",
   duration: "",
   date_uploaded: "",
   id: "",
   category: "",
   description: "",
};

const initialState: VideoContextState = {
   currentVideo: defaultVideo,
   setCurrentVideo: () => {},
};

export const VideoProviderContext =
   createContext<VideoContextState>(initialState);

export const VideoContext = ({ children }: VideoContextProps) => {
   const [currentVideo, setCurrentVideo] =
      useState<VideoDataTypes>(defaultVideo);

   return (
      <VideoProviderContext.Provider value={{ currentVideo, setCurrentVideo }}>
         {children}
      </VideoProviderContext.Provider>
   );
};

export type { VideoContextProps };
