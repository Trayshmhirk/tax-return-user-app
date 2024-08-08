import { useState } from "react";
import SearchAndFilter from "../components/SearchAndFilter";
import TextArea from "../components/TextArea";
import CustomButton from "../components/CustomButton";
import { Accordion } from "../components/Accordion";

type QuestionsPropsType = {
   question: string;
   answer: string | string[];
   questionCategory: string;
};

const questions: QuestionsPropsType[] = [
   {
      questionCategory: "Services",
      question:
         "What services does your firm provide in the areas of accounting, audit, and tax?",
      answer:
         "We offer a comprehensive suite of services, including tax planning and preparation, audit and assurance, accounting, bookkeeping, and financial consulting.",
   },
   {
      questionCategory: "Services",
      question:
         "Is your firm experienced in handling both individual and business tax matters?",
      answer:
         "Absolutely. Our team of experienced CPAs is well-versed in individual and business tax planning, compliance, and resolution of complex tax issues.",
   },
   {
      questionCategory: "Services",
      question:
         "Do you specialize in serving specific industries or work with clients from various sectors?",
      answer:
         "We have expertise across diverse industries, including healthcare, manufacturing, technology, and more. Our professionals understand the unique needs of different sectors.",
   },
   {
      questionCategory: "Services",
      question:
         "How do you customize your services to meet the specific needs of clients?",
      answer:
         "We begin with a comprehensive consultation to understand the unique needs of each client. Our services are then tailored to address specific financial goals and challenges.",
   },
   {
      questionCategory: "Services",
      question: `What is the typical process for engaging your firm's services?`,
      answer:
         " The process begins with an initial consultation to assess your needs. We then outline a customized plan, provide transparent pricing, and guide you through the onboarding process.",
   },
   {
      questionCategory: "Audits",
      question: "How can your firm assist with audits for businesses?",
      answer:
         "We provide thorough audit services, ensuring compliance with industry standards and regulations. Our team conducts detailed examinations to provide accurate and reliable financial information.",
   },
   {
      questionCategory: "Tax",
      question:
         "Can you help with tax planning and strategies to minimize liabilities?",
      answer:
         "Yes, tax planning is a core aspect of our services. We work closely with clients to develop effective strategies to minimize tax liabilities and optimize financial outcomes.",
   },
   {
      questionCategory: "Tax",
      question:
         "How does your firm stay updated on the latest tax laws and regulations?",
      answer:
         "Our team undergoes regular training and professional development to stay current with the latest changes in tax laws and regulations, ensuring our clients receive accurate advice.",
   },
   {
      questionCategory: "Security",
      question:
         "What measures does your firm have in place for client data security and confidentiality?",
      answer:
         "We prioritize the security and confidentiality of client data. Our firm employs robust cybersecurity measures and adheres to stringent confidentiality standards.",
   },
   {
      questionCategory: "IRS Assistance",
      question:
         "Can your firm assist with IRS-related issues, audits, and representation?",
      answer:
         "Yes, our experienced team can provide assistance and representation in IRS-related matters, including audits and resolution of tax issues.",
   },
   {
      questionCategory: "Technology",
      question:
         "How does your firm leverage technology in accounting and tax services?",
      answer:
         "We embrace advanced technologies, including cloud-based accounting solutions, to provide efficient and secure financial management accessible from anywhere.",
   },
   {
      questionCategory: "Technology",
      question: "What are the billing and fee structures for your services?",
      answer:
         "Our billing structures are transparent, and fees are based on the complexity and scope of services. We provide detailed breakdowns to ensure clarity and understanding.",
   },
   {
      questionCategory: "Technology",
      question:
         "How can potential clients schedule a consultation with your firm?",
      answer:
         "Prospective clients can easily schedule a consultation by [contacting us through our website/phone/email].",
   },
];

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
         question.questionCategory.toLowerCase() ===
         selectedFilter.toLowerCase()
      );
   };

   const filterQuestions = questions
      ? questions.filter(
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
                  <CustomButton handleClick={handleSubmitQuestion}>
                     Submit question
                  </CustomButton>
               </div>
            )}
         </div>
      </div>
   );
};

export default Faq;
