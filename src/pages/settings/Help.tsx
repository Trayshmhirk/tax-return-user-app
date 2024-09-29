import { useState } from "react";
import SearchAndFilter from "../../components/common/SearchAndFilter";
import { Accordion } from "../../components/common/Accordion";
import { QuestionsPropsType } from "../../types/AllTypes";
import { help } from "../../mocks/AllMockData";
import TextArea from "@/components/form-components/TextArea";
import { Button } from "@/components/ui/button";

const Help = () => {
   const [searchInput, setSearchInput] = useState("");
   const [selectedFilter, setSelectedFilter] = useState("");
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
      <>
         <h1 className="text-lg font-bold">Help and support</h1>

         <SearchAndFilter
            handleSearch={handleSearch}
            handleFilter={handleFilter}
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
               <div className="flex flex-col gap-4">
                  <TextArea
                     label="Have a question?"
                     placeholder="Type question here"
                  />
                  <Button type="button" onClick={handleSubmitQuestion}>
                     Submit question
                  </Button>
               </div>
            )}
         </div>
      </>
   );
};

export default Help;
