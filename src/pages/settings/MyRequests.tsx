import { useState } from "react";
import SearchAndFilter from "@/components/common/SearchAndFilter";
import { RequestsPropTypes } from "@/types/Types";
import { requests } from "@/mocks/MockData";
import { formatDate } from "date-fns";

const MyRequests = () => {
   const [searchInput, setSearchInput] = useState("");
   const [selectedFilter, setSelectedFilter] = useState("");
   const filterTitleList = ["All", "Pending", "Completed", "Paid"];

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
   };

   const searchRequests = (request: RequestsPropTypes) => {
      const requestTitle = request.service_title;
      return requestTitle.toLowerCase().includes(searchInput.toLowerCase());
   };

   const handleFilter = (title: string) => {
      setSelectedFilter(title);
   };

   const filterByStatus = (request: RequestsPropTypes) => {
      if (selectedFilter === "" || selectedFilter === "All") {
         // if no filter is selected, all users should be included
         return true;
      }
      return request.status.toLowerCase() === selectedFilter.toLowerCase();
   };

   const filteredRequests = requests
      ? requests.filter(
           (request) => searchRequests(request) && filterByStatus(request)
        )
      : [];

   const handleRequestCardClick = () => {};

   return (
      <>
         <h1 className="text-lg font-bold">My requests</h1>

         <SearchAndFilter
            handleSearch={handleSearch}
            handleFilter={handleFilter}
            title={filterTitleList}
         />

         <div className="w-full">
            {filteredRequests.length ? (
               <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredRequests.map((request, index) => (
                     <div
                        key={index}
                        onClick={handleRequestCardClick}
                        className="relative w-full flex flex-col justify-center gap-2 bg-white dark:bg-gray px-4 py-3 rounded-lg shadow-md dark:shadow-md-dark hover-shadow-body"
                     >
                        <div
                           className={`
                              absolute right-4 top-4 py-[2px] px-[6px] text-xs rounded
                              ${request.status.toLowerCase() === "pending" ? "warning" : ""}
                              ${request.status.toLowerCase() === "paid" ? "success" : ""}
                              ${request.status.toLowerCase() === "completed" ? "completed" : ""}
                           `}
                        >
                           {request.status}
                        </div>

                        <div className="text-sm">{request.service_id}</div>

                        <div className="text-sm">
                           <span className="text-richElectricBlue">
                              {request.service_title}
                           </span>
                        </div>

                        <div className="text-xs">
                           <span className="">
                              {formatDate(request.requestDate, "dd.MM.yyyy")}
                           </span>
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               <p className="pending-text w-full text-center">
                  No results found.
               </p>
            )}
         </div>
      </>
   );
};

export default MyRequests;
