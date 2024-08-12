import React, { useState } from "react";
import SearchAndFilter from "../components/SearchAndFilter";
import VideoCard from "../components/VideoCard";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

type VideoDataTypes = {
   title: string;
   time: string;
   uploaded: string;
   id: string;
   category: string;
};

const videoData: VideoDataTypes[] = [
   {
      title: "View previous filing",
      time: "1mins 15secs",
      uploaded: "1 day ago",
      id: "ad3f79ja7HD985af",
      category: "tax",
   },
   {
      title: "Create new filing",
      time: "2mins 15secs",
      uploaded: "2 days ago",
      id: "7fdYbfj73748ffgb",
      category: "tax",
   },
   {
      title: "Scan receipt",
      time: "1mins 15secs",
      uploaded: "4 days ago",
      id: "vnFHu830847bjhbf",
      category: "payment",
   },
   {
      title: "Upload e-receipt",
      time: "2mins 15secs",
      uploaded: "5 days ago",
      id: "Pfb7bYB8fbY47cb",
      category: "payment",
   },
   {
      title: "Share receipt",
      time: "1mins 15secs",
      uploaded: "7 days ago",
      id: "0bfbd74BvdtGff8bf9j",
      category: "payment",
   },
];

const KnowledgeBase = () => {
   const navigate = useNavigate();
   const location = useLocation();

   const [searchInput, setSearchInput] = useState("");
   const [selectedFilter, setSelectedFilter] = useState("");
   const [activeFilter, setActiveFilter] = useState("All");
   const filterTitleList = [
      "All",
      "Tax",
      "Payment",
      // "Attestation",
      // "Accounting",
   ];

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

   const paymentFilteredVideos = filteredVideos.filter(
      (video) => video.category === "payment"
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
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                  title={filterTitleList}
               />

               <div className="flex flex-col gap-3">
                  <p className="font-medium">Tax filing</p>
                  <div className="w-full flex flex-wrap gap-4 justify-between md:justify-normal">
                     {taxFilteredVideos.length ? (
                        taxFilteredVideos.map((video, index) => (
                           <VideoCard
                              key={index}
                              title={video.title}
                              time={video.time}
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
                  <p className="font-medium">Store receipts</p>
                  <div className="w-full flex flex-wrap gap-4 justify-between md:justify-normal">
                     {paymentFilteredVideos.length ? (
                        paymentFilteredVideos.map((video, index) => (
                           <VideoCard
                              key={index}
                              title={video.title}
                              time={video.time}
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
