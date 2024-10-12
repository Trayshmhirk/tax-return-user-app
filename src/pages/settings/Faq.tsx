import { useState } from "react";
import SearchAndFilter from "@/components/common/SearchAndFilter";
import TextArea from "@/components/form-components/TextArea";
import { Accordion } from "@/components/common/Accordion";
import { faqs } from "@/mocks/AllMockData";
import { QuestionsPropsType } from "@/types/AllTypes";
import { Button } from "@/components/ui/button";

const Faq = () => {
   const [searchInput, setSearchInput] = useState("");
   const [selectedFilter, setSelectedFilter] = useState("");
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
      <>
         <h1 className="text-lg font-bold">FAQs</h1>

         <div className="flex flex-col gap-6">
            <p className="text-sm max-w-5xl">
               Welcome to our Frequently Asked Questions (FAQ) section, where
               you can find answers to some of the most common questions about
               our services. In this section, you will find the answers to
               questions about our services as a tax returns organization, and
               how we can help you sort your tax return issues. If you can't
               find the answer to your questions here, please feel free to
               contact us and we'll be happy to assist you.
            </p>

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
         </div>
      </>
   );
};

export default Faq;
