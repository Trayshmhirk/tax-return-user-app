import { SetStateAction, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";

const SearchAndFilter = ({
   title,
   handleSearch,
   handleFilter,
   setActiveFilter,
   activeFilter,
   isButtonFilter,
}: SearchFilterProps) => {
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [selectedDropdownTitle, setSelectedDropdownTitle] = useState("All");

   const handleDropdownSelect = (title: string) => {
      setSelectedDropdownTitle(title);
      handleFilter(title);
      setActiveFilter(title);
      setIsDropdownOpen(false); // close the dropdown after selection
   };

   const handleFilterClick = (title: string) => {
      handleFilter(title);
      setActiveFilter(title);
   };

   return (
      <div className={`flex flex-col md:flex-row md:items-center gap-4`}>
         <label className="w-full h-12 flex items-center bg-white dark:bg-mutedGray p-3 pr-5 rounded-lg md:w-[350px] shadow-md dark:shadow-md-dark">
            <button className="px-3 cursor-pointer">
               <FaMagnifyingGlass className="w-4 h-4 text-gray dark:text-white" />
            </button>
            <input
               type="text"
               placeholder="Search"
               className="flex-grow bg-transparent border-none placeholder:text-gray dark:placeholder:text-white placeholder:text-opacity-70 dark:placeholder:text-opacity-70 outline-none"
               onChange={handleSearch}
            />
         </label>

         {!isButtonFilter ? (
            <div className="relative">
               <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="bg-white dark:bg-mutedGray w-40 h-11 py-3 px-6 text-center rounded-lg shadow-md dark:shadow-md-dark text-sm font-medium flex items-center gap-3"
               >
                  <IoFilter className="text-lg text-gray dark:text-white" />
                  {selectedDropdownTitle}
               </button>
               {isDropdownOpen && (
                  <div className="absolute left-0 right-0 bg-white dark:bg-mutedGray mt-2 w-40 rounded-lg shadow-md dark:shadow-md-dark z-10 overflow-hidden">
                     {title.map((filterTitle, index) => (
                        <div
                           key={index}
                           className="py-2 px-5 text-sm font-medium hover:bg-brightGray dark:hover:bg-spanishGray cursor-pointer"
                           onClick={() => handleDropdownSelect(filterTitle)}
                        >
                           {filterTitle}
                        </div>
                     ))}
                  </div>
               )}
            </div>
         ) : (
            <div className="filter flex items-center gap-3">
               {title.map((title, index) => (
                  <div
                     key={index}
                     className={`
                     h-10 flex items-center justify-center text-[13px] text-eerieBlack font-medium py-3 px-4 text-center rounded-3xl shadow-md dark:shadow-md-dark cursor-pointer hover-shadow-body
                     ${activeFilter === title ? "bg-richElectricBlue text-white px-5" : "bg-white dark:bg-spanishGray"}
                  `}
                     id={title}
                     onClick={() => handleFilterClick(title)}
                  >
                     {title}
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default SearchAndFilter;

type SearchFilterProps = {
   title: string[];
   handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
   handleFilter: (title: string) => void;
   activeFilter: string;
   setActiveFilter: React.Dispatch<SetStateAction<string>>;
   isButtonFilter?: boolean;
};
