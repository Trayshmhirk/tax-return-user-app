import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandItem,
   CommandList,
} from "@/components/ui/command";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";

const SearchAndFilter = ({
   title,
   handleSearch,
   handleFilter,
}: SearchFilterProps) => {
   const [open, setOpen] = useState(false);
   const [value, setValue] = useState("");

   const handleDropdownSelect = (title: string) => {
      handleFilter(title);
   };

   return (
      <div className="w-full flex flex-col md:flex-row md:items-center gap-4">
         <label className="w-full h-10 flex items-center bg-white dark:bg-mutedGray p-3 pr-5 rounded sm:w-[300px] shadow-md dark:shadow-md-dark">
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

         <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
               <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] h-10 flex items-center bg-white dark:bg-mutedGray px-4 py-3 rounded shadow-md dark:shadow-md-dark justify-between border-0"
               >
                  <div className="flex items-center gap-2">
                     <IoFilter className="w-4 h-4" />
                     {value ? title.find((t) => t === value) : "Filter"}
                  </div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
               </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
               <Command>
                  <CommandList>
                     {title.length === 0 ? (
                        <CommandEmpty>No filter found.</CommandEmpty>
                     ) : (
                        <CommandGroup>
                           {title.map((filterTitle, index) => (
                              <CommandItem
                                 key={index}
                                 value={filterTitle}
                                 onSelect={(currentValue) => {
                                    setValue(
                                       currentValue === value
                                          ? ""
                                          : currentValue
                                    );
                                    setOpen(false);
                                    handleDropdownSelect(currentValue);
                                 }}
                              >
                                 <Check
                                    className={cn(
                                       "mr-2 h-4 w-4",
                                       value === filterTitle
                                          ? "opacity-100"
                                          : "opacity-0"
                                    )}
                                 />
                                 {filterTitle}
                              </CommandItem>
                           ))}
                        </CommandGroup>
                     )}
                  </CommandList>
               </Command>
            </PopoverContent>
         </Popover>
      </div>
   );
};

export default SearchAndFilter;

type SearchFilterProps = {
   title: string[];
   handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
   handleFilter: (title: string) => void;
};
