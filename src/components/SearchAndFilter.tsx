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

         <div className="filter flex items-center gap-3">
            {title.map((title, index) => (
               <div
                  key={index}
                  className={`
                     h-10 flex items-center justify-center text-[13px] text-eerieBlack font-medium py-3 px-4 rounded-3xl shadow-md dark:shadow-md-dark
                     ${activeFilter === title ? "bg-richElectricBlue text-white px-5" : "bg-white dark:bg-spanishGray"}
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
