import { useState } from "react";
import { IoFilter } from "react-icons/io5";
import { Check, ChevronsUpDown, Search } from "lucide-react";

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
import { Input } from "../ui/input";

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
         <label
            htmlFor="search"
            className="max-w-72 w-full h-10 flex items-center bg-white dark:bg-gray p-1 px-4 rounded sm:w-[300px] shadow-md dark:shadow-md-dark"
         >
            <Search className="w-4 h-4 dark:text-white" />
            <Input
               id="search"
               type="text"
               placeholder="Search"
               className="h-full py-1 bg-transparent dark:bg-transparent border-none outline-none"
               onChange={handleSearch}
            />
         </label>

         <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
               <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] h-10 flex items-center bg-white dark:bg-gray px-4 py-3 rounded shadow-md dark:shadow-md-dark justify-between border-0"
               >
                  <div className="flex items-center gap-3">
                     <IoFilter className="w-4 h-4" />
                     {value ? title.find((t) => t === value) : "Filters"}
                  </div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
               </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
               <Command className="bg-white dark:bg-gray shadow-md dark:shadow-md-dark">
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
