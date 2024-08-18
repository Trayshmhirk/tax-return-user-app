import { useState } from "react";
import SearchAndFilter from "../components/common/SearchAndFilter";
import { RequestsPropTypes } from "../types/AllTypes";
import { requests } from "../mocks/AllMockData";

const MyRequests = () => {
   const [searchInput, setSearchInput] = useState("");
   const [selectedFilter, setSelectedFilter] = useState("");
   const [activeFilter, setActiveFilter] = useState("All");
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
      return request.status === selectedFilter.toLowerCase();
   };

   const filteredRequests = requests
      ? requests.filter(
           (request) => searchRequests(request) && filterByStatus(request)
        )
      : [];

   const handleRequestCardClick = () => {};

   return (
      <div className="flex flex-col gap-9">
         <SearchAndFilter
            handleSearch={handleSearch}
            handleFilter={handleFilter}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            title={filterTitleList}
         />

         <div className="w-full flex flex-wrap gap-5">
            {filteredRequests.length ? (
               <>
                  {filteredRequests.map((request, index) => (
                     <div
                        key={index}
                        onClick={handleRequestCardClick}
                        className="relative w-full flex flex-col justify-center gap-3 bg-white dark:bg-gray p-6 rounded-lg shadow-md dark:shadow-md-dark hover-shadow-body lg:calc-width-three"
                     >
                        <div
                           className={`
                              absolute right-4 top-4 py-1 px-2 rounded
                              ${request.status.toLowerCase() === "pending" ? "pending" : ""}
                              ${request.status.toLowerCase() === "paid" ? "paid" : ""}
                              ${request.status.toLowerCase() === "completed" ? "completed" : ""}
                           `}
                        >
                           {request.status}
                        </div>

                        <div className="text-lg">
                           Request ID: {request.service_id}
                        </div>

                        <div className="flex gap-3">
                           <p>Request: </p>
                           <span className="text-richElectricBlue">
                              {request.service_title}
                           </span>
                        </div>

                        <div className="flex gap-3">
                           <p>Request date: </p>
                           <span className="">{request.requestDate}</span>
                        </div>
                     </div>
                  ))}
               </>
            ) : (
               <p className="pending-text w-full text-center">
                  Nothing to show here.
               </p>
            )}
         </div>
      </div>
   );
};

export default MyRequests;
