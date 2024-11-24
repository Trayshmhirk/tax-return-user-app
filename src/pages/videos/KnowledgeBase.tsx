import React, { useState } from "react";
import SearchAndFilter from "@/components/common/SearchAndFilter";
import VideoCard from "@/components/cards/VideoCard";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useGetVideosQuery } from "@/redux/api/apiSlice";
import { ClipLoader } from "react-spinners";
import PlaceholderText from "@/components/common/PlaceholderText";

const KnowledgeBase = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const { data: videos = [], isLoading } = useGetVideosQuery();

   const [searchInput, setSearchInput] = useState("");
   const [selectedFilter, setSelectedFilter] = useState("");
   const filterTitleList = ["All", "Tax", "Bank", "Documents"];

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
   };

   const searchVideos = (video: VideoPropTypes) => {
      const title = video.title;
      return title.toLowerCase().includes(searchInput.toLowerCase());
   };

   const handleFilter = (title: string) => {
      setSelectedFilter(title);
   };

   const filterByVideoCategory = (video: VideoPropTypes) => {
      if (selectedFilter === "" || selectedFilter === "All") {
         return true;
      }
      return video.category.toLowerCase() === selectedFilter.toLowerCase();
   };

   const filteredVideos = videos
      ? videos.filter(
           (video) => searchVideos(video) && filterByVideoCategory(video)
        )
      : [];

   const taxFilteredVideos = filteredVideos.filter(
      (video) => video.category === "tax"
   );

   const bankFilteredVideos = filteredVideos.filter(
      (video) => video.category === "bank"
   );

   const documentsFilteredVideos = filteredVideos.filter(
      (video) => video.category === "documents"
   );

   const handleSelectVideo = (videoID: string) => {
      navigate(`video/${videoID}`);
   };

   return (
      <>
         {location.pathname === "/knowledge-base" ? (
            <div className="flex flex-col gap-7">
               <SearchAndFilter
                  handleSearch={handleSearch}
                  handleFilter={handleFilter}
                  title={filterTitleList}
               />

               {isLoading ? (
                  <div className="w-full h-20 flex justify-center items-center">
                     <ClipLoader color="#00A2C9" />
                  </div>
               ) : (
                  <>
                     <div className="w-full flex flex-col gap-4">
                        <p className="font-medium">Tax service request</p>
                        {taxFilteredVideos.length !== 0 ? (
                           <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                              {taxFilteredVideos.map((video, index) => (
                                 <VideoCard
                                    key={index}
                                    video={video}
                                    handleClick={() =>
                                       handleSelectVideo(video.id)
                                    }
                                 />
                              ))}
                           </div>
                        ) : (
                           <PlaceholderText text="No results found." />
                        )}
                     </div>

                     <div className="flex flex-col gap-3">
                        <p className="font-medium">Bank</p>
                        {bankFilteredVideos.length !== 0 ? (
                           <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                              {bankFilteredVideos.map((video, index) => (
                                 <VideoCard
                                    key={index}
                                    video={video}
                                    handleClick={() =>
                                       handleSelectVideo(video.id)
                                    }
                                 />
                              ))}
                           </div>
                        ) : (
                           <PlaceholderText text="No results found." />
                        )}
                     </div>

                     <div className="flex flex-col gap-3">
                        <p className="font-medium">Documents</p>
                        {documentsFilteredVideos.length !== 0 ? (
                           <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                              {documentsFilteredVideos.map((video, index) => (
                                 <VideoCard
                                    key={index}
                                    video={video}
                                    handleClick={() =>
                                       handleSelectVideo(video.id)
                                    }
                                 />
                              ))}
                           </div>
                        ) : (
                           <PlaceholderText text="No results found." />
                        )}
                     </div>
                  </>
               )}
            </div>
         ) : (
            <Outlet />
         )}
      </>
   );
};

export default KnowledgeBase;
