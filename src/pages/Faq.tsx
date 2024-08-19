import { useState } from "react";
import SearchAndFilter from "../components/common/SearchAndFilter";
import TextArea from "../components/form-components/TextArea";
import CustomButton from "../components/form-components/CustomButton";
import { Accordion } from "../components/common/Accordion";
import { faqs } from "../mocks/AllMockData";
import { QuestionsPropsType } from "../types/AllTypes";

const Faq = () => {
   const [searchInput, setSearchInput] = useState("");
   const [selectedFilter, setSelectedFilter] = useState("");
   const [activeFilter, setActiveFilter] = useState("All");
   const filterTitleList = [
      "All",
      "Services",
      "Audits",
      "Tax",
      "Security",
      "Technology",
   ];

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

   const filterByQuestions = (question: QuestionsPropsType) => {
      if (selectedFilter === "" || selectedFilter === "All") {
         return true;
      }
      return (
         question.questionCategory?.toLowerCase() ===
         selectedFilter.toLowerCase()
      );
   };

   const filterQuestions = faqs
      ? faqs.filter(
           (question) =>
              searchQuestions(question) && filterByQuestions(question)
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

export default Faq;
