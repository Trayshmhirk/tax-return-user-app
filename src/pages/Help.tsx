import { useState } from "react";
import SearchAndFilter from "../components/SearchAndFilter";
import { Accordion } from "../components/Accordion";
import TextArea from "../components/TextArea";
import CustomButton from "../components/CustomButton";
import { QuestionsPropsType } from "../types/AllTypes";
import { help } from "../mocks/AllMockData";

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

   const handleSubmitQuestion = () => {};

   return (
      <div className="flex flex-col gap-7">
         <SearchAndFilter
            handleSearch={handleSearch}
            handleFilter={handleFilter}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            title={filterTitleList}
         />

         <div className="flex flex-col gap-4 md:h-full">
            {filterQuestions.length ? (
               filterQuestions.map((question, index) => (
                  <Accordion
                     key={index}
                     question={question.question}
                     answer={question.answer}
                  />
               ))
            ) : (
               <div className="flex flex-col gap-4">
                  <TextArea
                     label="Have a question?"
                     placeholder="Type question here"
                  />
                  <CustomButton
                     type="button"
                     handleClick={handleSubmitQuestion}
                  >
                     Submit question
                  </CustomButton>
               </div>
            )}
         </div>
      </div>
   );
};

export default Help;
