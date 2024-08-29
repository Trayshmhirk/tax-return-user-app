import {
   DocumentsPropTypes,
   ReceiptsPropTypes,
   VideoDataTypes,
   ServicesListTypes,
   CategoryListTypes,
   QuestionsPropsType,
   RequestsPropTypes,
} from "../types/AllTypes";

// request service
export const servicesList: ServicesListTypes[] = [
   {
      title: "Accounting",
      service_id: "1",
   },
   {
      title: "Attestation services",
      service_id: "2",
   },
   {
      title: "Management consulting",
      service_id: "3",
   },
   {
      title: "Tax services",
      service_id: "4",
   },
   {
      title: "Payment services",
      service_id: "5",
   },
   {
      title: "Other",
      service_id: "6",
   },
];

export const categoryList: CategoryListTypes[] = [
   {
      name: "Individuals",
      category_id: "",
   },
   {
      name: "Partnership",
      category_id: "",
   },
   {
      name: "Corporation",
      category_id: "",
   },
   {
      name: "Sole Proprietorship",
      category_id: "",
   },
   {
      name: "Others",
      category_id: "",
   },
];

// documents
export const uploadedDocuments: DocumentsPropTypes[] = [
   {
      id: "id1",
      document_name: "Document 1adfuubadfdajhjahdf",
      document_size: "20",
      document_type: "application/pdf",
      date_modified: "",
   },
   {
      id: "id2",
      document_name: "document",
      document_size: "20",
      document_type: "image/png",
      date_modified: "",
   },
   {
      id: "id3",
      document_name: "Excel file",
      document_size: "20",
      document_type: "application/vnd.ms-excel",
      date_modified: "",
   },
   {
      id: "id4",
      document_name: "Word file",
      document_size: "20",
      document_type: "application/msword",
      date_modified: "",
   },
];

// receipts
export const receipts: ReceiptsPropTypes[] = [
   {
      id: "retdb2137",
      title: "receipt",
      owner_info: {
         fullname: "Micheal",
      },
      date: "08/07/2024",
   },
   {
      id: "retug7457",
      title: "receipt",
      owner_info: {
         fullname: "Micheal",
      },
      date: "06/07/2024",
   },
   {
      id: "rettg4567",
      title: "receipt",
      owner_info: {
         fullname: "Micheal",
      },
      date: "12/02/1999",
   },
   {
      id: "rettg4567",
      title: "receipt",
      owner_info: {
         fullname: "Micheal",
      },
      date: "12/02/1999",
   },
];

export const videoData: VideoDataTypes[] = [
   {
      title: "View previous filing",
      time: "1mins 15secs",
      uploaded: "1 day ago",
      id: "ad3f79ja7HD985af",
      category: "tax",
   },
   {
      title: "Create new filing",
      time: "2mins 15secs",
      uploaded: "2 days ago",
      id: "7fdYbfj73748ffgb",
      category: "tax",
   },
   {
      title: "Scan receipt",
      time: "1mins 15secs",
      uploaded: "4 days ago",
      id: "vnFHu830847bjhbf",
      category: "payment",
   },
   {
      title: "Upload e-receipt",
      time: "2mins 15secs",
      uploaded: "5 days ago",
      id: "Pfb7bYB8fbY47cb",
      category: "payment",
   },
   {
      title: "Share receipt",
      time: "1mins 15secs",
      uploaded: "7 days ago",
      id: "0bfbd74BvdtGff8bf9j",
      category: "payment",
   },
];

// faqs
export const faqs: QuestionsPropsType[] = [
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

// help
export const help: QuestionsPropsType[] = [
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

// requests
export const requests: RequestsPropTypes[] = [
   {
      service_id: "string",
      status: "Pending",
      requestDate: "string",
      service_title: "string",
   },
   {
      service_id: "string",
      status: "Completed",
      requestDate: "string",
      service_title: "string",
   },
   {
      service_id: "string",
      status: "Paid",
      requestDate: "string",
      service_title: "string",
   },
];
