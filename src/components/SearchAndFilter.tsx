import { SetStateAction } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

type SearchFilterProps = {
   title: string[];
   handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
   handleFilter: (title: string) => void;
   activeFilter: string;
   setActiveFilter: React.Dispatch<SetStateAction<string>>;
};

const SearchAndFilter = ({
   title,
   handleSearch,
   handleFilter,
   setActiveFilter,
   activeFilter,
}: SearchFilterProps) => {
   const handleFilterClick = (title: string) => {
      handleFilter(title);
      setActiveFilter(title);
   };

   return (
      <div className="flex flex-col md:flex-row gap-4">
         <label className="w-100 h-14 flex items-center bg-white dark:bg-spanishGray px-4 py-3 rounded-lg md:w-[350px]">
            <button className="px-3 cursor-pointer">
               <FaMagnifyingGlass className="w-4 h-4 text-gray dark:text-white" />
            </button>
            <input
               type="text"
               placeholder="Search"
               className="flex-grow bg-transparent border-none placeholder:text-gray outline-none"
               onChange={handleSearch}
            />
         </label>

         <div className="filter min-w-full overflow-scroll flex items-center gap-3 md:w-full md:overflow-visible">
            {title.map((title, index) => (
               <div
                  key={index}
                  className={`
                  filter-item
                     ${activeFilter === "All" ? "filter-all" : ""}
                     ${activeFilter === title ? "filter-active active-padding" : "filter-users"}
                     flex items-center justify-center
                  `}
                  id={title}
                  onClick={() => handleFilterClick(title)}
               >
                  {title}
               </div>
            ))}
         </div>
      </div>
   );
};

export default SearchAndFilter;
