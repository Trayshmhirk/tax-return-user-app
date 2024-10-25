import React, { useState } from "react";
import SearchAndFilter from "@/components/common/SearchAndFilter";
import VideoCard from "@/components/cards/VideoCard";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { videoData } from "@/mocks/MockData";
import { VideoDataTypes } from "@/types/Types";

const KnowledgeBase = () => {
   const navigate = useNavigate();
   const location = useLocation();

   const [searchInput, setSearchInput] = useState("");
   const [selectedFilter, setSelectedFilter] = useState("");
   const filterTitleList = ["All", "Tax", "Bank", "Documents"];

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
   };

   const searchVideos = (video: VideoDataTypes) => {
      const title = video.title;
      return title.toLowerCase().includes(searchInput.toLowerCase());
   };

   const handleFilter = (title: string) => {
      setSelectedFilter(title);
   };

   const filterByVideoCategory = (video: VideoDataTypes) => {
      if (selectedFilter === "" || selectedFilter === "All") {
         return true;
      }
      return video.category.toLowerCase() === selectedFilter.toLowerCase();
   };

   const filteredVideos = videoData
      ? videoData.filter(
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

   const handleSelectVideo = (videoId: string) => {
      // Navigate to the "Watch Video" route and pass the title as a parameter
      navigate(`video/${videoId}`);
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

               <div className="flex flex-col gap-3">
                  <p className="font-medium">Tax service request</p>
                  <div className="w-full flex flex-wrap gap-4 justify-between md:justify-normal">
                     {taxFilteredVideos.length ? (
                        taxFilteredVideos.map((video, index) => (
                           <VideoCard
                              key={index}
                              video={video}
                              handleClick={() => handleSelectVideo(video.id)}
                           />
                        ))
                     ) : (
                        <p className="w-full pending-text text-center">
                           No results found
                        </p>
                     )}
                  </div>
               </div>

               <div className="flex flex-col gap-3">
                  <p className="font-medium">Bank</p>
                  <div className="w-full flex flex-wrap gap-4 justify-between md:justify-normal">
                     {bankFilteredVideos.length ? (
                        bankFilteredVideos.map((video, index) => (
                           <VideoCard
                              key={index}
                              video={video}
                              handleClick={() => handleSelectVideo(video.id)}
                           />
                        ))
                     ) : (
                        <p className="w-full pending-text text-center">
                           No results found
                        </p>
                     )}
                  </div>
               </div>

               <div className="flex flex-col gap-3">
                  <p className="font-medium">Documents</p>
                  <div className="w-full flex flex-wrap gap-4 justify-between md:justify-normal">
                     {documentsFilteredVideos.length ? (
                        documentsFilteredVideos.map((video, index) => (
                           <VideoCard
                              key={index}
                              video={video}
                              handleClick={() => handleSelectVideo(video.id)}
                           />
                        ))
                     ) : (
                        <p className="w-full pending-text text-center">
                           No results found
                        </p>
                     )}
                  </div>
               </div>
            </div>
         ) : (
            <Outlet />
         )}
      </>
   );
};

export default KnowledgeBase;
