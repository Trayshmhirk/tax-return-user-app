import { FaMagnifyingGlass } from "react-icons/fa6";

type SearchFilterProps = {
   title: string;
   placeHolder: string;
   handleSearch: () => void;
   handleFilter: () => void;
   activeFilter: string;
   value: string;
};

const SearchAndFilter = ({
   // title,
   handleSearch,
   // handleFilter,
   // setActiveFilter,
   // activeFilter,
   value,
}: SearchFilterProps) => {
   return (
      <div className="flex flex-col md:flex-row gap-4">
         <label className="w-100 h-14 flex items-center px-4 py-3 rounded-lg md:w-[350px]">
            <button className="btn">
               <FaMagnifyingGlass className="w-4 h-4 text-gray dark:text-white" />
            </button>
            <input
               type="text"
               placeholder="Search"
               className="flex-grow bg-transparent border-none placeholder:text-gray outline-none"
               onChange={handleSearch}
               value={value}
            />
         </label>

         <div className="filter min-w-full overflow-scroll flex items-center gap-3 md:w-full md:overflow-visible"></div>
      </div>
   );
};

export default SearchAndFilter;
