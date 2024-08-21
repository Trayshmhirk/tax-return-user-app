import { useState } from "react";
import SearchAndFilter from "../../components/common/SearchAndFilter";
import { Accordion } from "../../components/common/Accordion";
import { QuestionsPropsType } from "../../types/AllTypes";
import { help } from "../../mocks/AllMockData";

const Help = () => {
   const [searchInput, setSearchInput] = useState("");
   const [selectedFilter, setSelectedFilter] = useState("");
   const [activeFilter, setActiveFilter] = useState("All");
   const filterTitleList = ["All", "Ask a question"];

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
   };

   const searchQuestions = (question: QuestionsPropsType) => {
      const questions = question.question;
      return questions.toLowerCase().includes(searchInput.toLowerCase());
   };

   const handleFilter = (title: string) => {
      setSelectedFilter(title);
   };

   const filterByQuestions = () => {
      if (selectedFilter === "" || selectedFilter === "All") {
         return true;
      }
      return;
   };

   const filterQuestions = help
      ? help.filter(
           (question) => searchQuestions(question) && filterByQuestions()
        )
      : [];

   return (
      <>
         <h1 className="text-lg font-semibold">Help and support</h1>

         <SearchAndFilter
            handleSearch={handleSearch}
            handleFilter={handleFilter}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            title={filterTitleList}
         />

         <div className="flex flex-col gap-4">
            {filterQuestions.length ? (
               filterQuestions.map((question, index) => (
                  <Accordion
                     key={index}
                     question={question.question}
                     answer={question.answer}
                  />
               ))
            ) : (
               <p className="pending-text w-full text-center">
                  No results found.
               </p>
            )}
         </div>
      </>
   );
};

export default Help;
