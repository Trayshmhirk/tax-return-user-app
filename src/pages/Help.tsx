import { useState } from "react";
import SearchAndFilter from "../components/SearchAndFilter";
import { Accordion } from "../components/Accordion";
import TextArea from "../components/TextArea";
import CustomButton from "../components/CustomButton";

type QuestionsPropsType = {
   question: string;
   answer: string | string[];
};

const questions: QuestionsPropsType[] = [
   {
      question: "Who Are We?",
      answer: [
         "Tailored Financial Solutions for Individuals and Corporations. Empowering Your Financial Success.",
         "Where Excellence Meets Expertise in Payroll, Tax, and Management Consulting. ",
      ],
   },
   {
      question: "Services Tailored for You",
      answer: [
         "Attestation Services: Auditing, review, agreed-upon procedures, and assurance services.",
         "Accounting: General bookkeeping, compilation of financial statements.Payroll Services: Preparation, quarterly tax filing, W2/1099, and federal and state unemployment returns.",
         "Payroll Services: Preparation, quarterly tax filing, W2/1099, and federal and state unemployment returns.",
         "Tax Services: Corporate, individual, and not-for-profit organizations.",
         "Management Consulting: Profit enhancement, employee benefit consulting, and business valuation.",
      ],
   },
   {
      question: "Industries We Serve",
      answer: [
         "•	Health Care",
         "•	Government",
         "•	Not for Profit",
         "•	Manufacturing",
         "•	Real Estate/Construction",
      ],
   },
   {
      question: "Why Choose Us?",
      answer: [
         "Navigating Financial Complexity Made Simple. When you choose Okeh & Associates P.C, you're choosing:",
         "•	Comprehensive Approach:",
         "From auditing to payroll and tax services, our holistic approach guarantees that every financial facet is considered, providing optimal and tailored solutions for individuals and businesses alike.",
         "•	Multidisciplinary Teams: ",
         "Our teams aren't just knowledgeable; they are specifically tailored to understand and cater to the intricate needs of your organization, providing solutions that align with your goals and challenges.",
         "•	Experience Matters: ",
         "Over two decades of expertise in industries like healthcare, government, nonprofits, manufacturing, and real estate ensures you benefit from seasoned professionals who understand your unique challenges.",
         "•	Guaranteed Satisfaction: ",
         "As certified public accountants, we guarantee 100% satisfaction. Our commitment to excellence is sealed with a range of services, including IRS tax resolution, payment plans, and audit representation.",
      ],
   },
   {
      question: `Hear What Our Clients Say`,
      answer: [
         "Discover the transformative experiences shared by those who entrusted their financial journey to Okeh & Associates P.C.",

         `
            •	I prepared my Taxes with Okeh & Associates and infact i was very satisfied with the service. I managed to correct my past mistakes and ultimately received my returns on time. The CPA's here are very knowledgeable, insightful and thorough. I definitely recommend Okeh & Associates for all your tax and accounting needs.,
               Laureen Smith,
               Lanham, MD
         `,

         "CLIENTS",
         "•	U.S. Department of Justice, Immigration & Naturalization Service",
         "•	National Center for Strategic Nonprofit Planning & Community Leadership",
         "•	District of Columbia Government, Roots Public Charter School",
      ],
   },
];

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

   const filterQuestions = questions
      ? questions.filter(
           (question) => searchQuestions(question) && filterByQuestions()
        )
      : [];

   const handleSubmitQuestion = () => {};

   return (
      <div className="flex flex-col gap-6">
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
                  <CustomButton handleClick={handleSubmitQuestion}>
                     Submit question
                  </CustomButton>
               </div>
            )}
         </div>
      </div>
   );
};

export default Help;
