import {
   DocumentsPropTypes,
   InvoicesPropTypes,
   VideoDataTypes,
   ServicesListTypes,
   CategoryListTypes,
   QuestionsPropsType,
   RequestsPropTypes,
   CardsProps,
   MetricCardProps,
   ChatsPropType,
   ChatAccessStatus,
   MessageType,
} from "@/types/Types";
import { v4 as uuidv4 } from "uuid";

export const headerTitleMap: Record<string, string> = {
   "/": "Welcome",
   "/not-approved": "Please wait...",
   "/upload-documents": "Upload documents",
   "/invoices": "Invoices",
   "/chat": "Chat",
   "/transactions": "Transactions",
   "/bank": "Bank",
   "/knowledge-base": "Knowledge base",
   "/settings/profile": "Account settings",
   "/settings/faq": "Account settings",
   "/settings/help-and-support": "Account settings",
   "/settings/privacy-policy": "Account settings",
   "/settings/my-requests": "Account settings",
   "/settings/files": "Account settings",
   "/settings/integrated-banks": "Account settings",
   "/settings/terms-and-conditions": "Account settings",
   "/knowledge-base/video/": "Watch video",
};

// request service
export const servicesList: ServicesListTypes[] = [
   {
      title: "Accounting",
      service_id: uuidv4(),
   },
   {
      title: "Attestation services",
      service_id: uuidv4(),
   },
   {
      title: "Management consulting",
      service_id: uuidv4(),
   },
   {
      title: "Tax services",
      service_id: uuidv4(),
   },
   {
      title: "Payment services",
      service_id: uuidv4(),
   },
   {
      title: "Custom services",
      service_id: uuidv4(),
   },
];

export const categoryList: CategoryListTypes[] = [
   {
      name: "Individuals",
      category_id: uuidv4(),
   },
   {
      name: "Partnership",
      category_id: uuidv4(),
   },
   {
      name: "Corporation",
      category_id: uuidv4(),
   },
   {
      name: "Sole Proprietorship",
      category_id: uuidv4(),
   },
   {
      name: "Others",
      category_id: uuidv4(),
   },
];

// documents
export const uploadedDocuments: DocumentsPropTypes[] = [
   {
      id: uuidv4(),
      document_name: "Document 1adfuubadfdajhjahdf",
      document_size: "20",
      document_type: "application/pdf",
      date_modified: "2024-08-25",
      base64: "",
   },
];

// invoices
export const invoices: InvoicesPropTypes[] = [
   {
      id: "INV83647",
      title: "Tax payment",
      issued_by: "admin@taxreturns",
      due_date: "2024-10-03",
      amount: 5900,
      status: "pending",
      base64: "",
   },
   {
      id: "INV63478",
      title: "Asset tax",
      issued_by: "superadmin@taxreturns",
      due_date: "2024-10-01",
      amount: 4799,
      status: "overdue",
      base64: "",
   },
   {
      id: "INV93788",
      title: "Asset tax",
      issued_by: "superadmin@taxreturns",
      due_date: "2024-10-01",
      amount: 4799,
      status: "paid",
      base64: "",
   },
];

export const videoData: VideoDataTypes[] = [
   {
      title: "Request service",
      duration: "1mins 15secs",
      date_uploaded: "1 day ago",
      id: uuidv4(),
      category: "tax",
      description:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis quos dicta quasi praesentium, natus, sapiente labore accusantium, nesciunt nostrum reprehenderit doloribus nihiliusto inventore porro repellendus. Earum soluta veniam dolorum fuga, minus aperiam debitis possimus animi alias assumendasint vero aspernatur ratione blanditiis eius. Reiciendis libero voluptatum architecto, fugiat provident accusantiumdeleniti quas, sapiente nam ab quia. Cum id facere quibusdam reiciendis culpa possimus consectetur quis. Eligendi quidemfugit mollitia cum alias aliquam sit hic, laborum, officia,numquam fugiat vel at! Esse quaerat unde dignissimos voluptates non. Vero id, magni veniam animi fuga odio neque esse deleniti praesentium? ",
   },
   {
      title: "Chat with admin",
      duration: "2mins 15secs",
      date_uploaded: "2 days ago",
      id: uuidv4(),
      category: "tax",
      description:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis quos dicta quasi praesentium, natus, sapiente labore accusantium, nesciunt nostrum reprehenderit doloribus nihiliusto inventore porro repellendus. Earum soluta veniam dolorum fuga, minus aperiam debitis possimus animi alias assumendasint vero aspernatur ratione blanditiis eius. Reiciendis libero voluptatum architecto, fugiat provident accusantiumdeleniti quas, sapiente nam ab quia. Cum id facere quibusdam reiciendis culpa possimus consectetur quis. Eligendi quidemfugit mollitia cum alias aliquam sit hic, laborum, officia,numquam fugiat vel at! Esse quaerat unde dignissimos voluptates non. Vero id, magni veniam animi fuga odio neque esse deleniti praesentium? ",
   },
   {
      title: "Pay for service",
      duration: "2mins 15secs",
      date_uploaded: "2 days ago",
      id: uuidv4(),
      category: "tax",
      description:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis quos dicta quasi praesentium, natus, sapiente labore accusantium, nesciunt nostrum reprehenderit doloribus nihiliusto inventore porro repellendus. Earum soluta veniam dolorum fuga, minus aperiam debitis possimus animi alias assumendasint vero aspernatur ratione blanditiis eius. Reiciendis libero voluptatum architecto, fugiat provident accusantiumdeleniti quas, sapiente nam ab quia. Cum id facere quibusdam reiciendis culpa possimus consectetur quis. Eligendi quidemfugit mollitia cum alias aliquam sit hic, laborum, officia,numquam fugiat vel at! Esse quaerat unde dignissimos voluptates non. Vero id, magni veniam animi fuga odio neque esse deleniti praesentium? ",
   },
   {
      title: "Manage credit cards",
      duration: "1mins 15secs",
      date_uploaded: "4 days ago",
      id: uuidv4(),
      category: "bank",
      description:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis quos dicta quasi praesentium, natus, sapiente labore accusantium, nesciunt nostrum reprehenderit doloribus nihiliusto inventore porro repellendus. Earum soluta veniam dolorum fuga, minus aperiam debitis possimus animi alias assumendasint vero aspernatur ratione blanditiis eius. Reiciendis libero voluptatum architecto, fugiat provident accusantiumdeleniti quas, sapiente nam ab quia. Cum id facere quibusdam reiciendis culpa possimus consectetur quis. Eligendi quidemfugit mollitia cum alias aliquam sit hic, laborum, officia,numquam fugiat vel at! Esse quaerat unde dignissimos voluptates non. Vero id, magni veniam animi fuga odio neque esse deleniti praesentium? ",
   },
   {
      title: "Manage transactions",
      duration: "2mins 15secs",
      date_uploaded: "5 days ago",
      id: uuidv4(),
      category: "bank",
      description:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis quos dicta quasi praesentium, natus, sapiente labore accusantium, nesciunt nostrum reprehenderit doloribus nihiliusto inventore porro repellendus. Earum soluta veniam dolorum fuga, minus aperiam debitis possimus animi alias assumendasint vero aspernatur ratione blanditiis eius. Reiciendis libero voluptatum architecto, fugiat provident accusantiumdeleniti quas, sapiente nam ab quia. Cum id facere quibusdam reiciendis culpa possimus consectetur quis. Eligendi quidemfugit mollitia cum alias aliquam sit hic, laborum, officia,numquam fugiat vel at! Esse quaerat unde dignissimos voluptates non. Vero id, magni veniam animi fuga odio neque esse deleniti praesentium? ",
   },
   {
      title: "Share transaction receipt",
      duration: "1mins 15secs",
      date_uploaded: "7 days ago",
      id: uuidv4(),
      category: "bank",
      description:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis quos dicta quasi praesentium, natus, sapiente labore accusantium, nesciunt nostrum reprehenderit doloribus nihiliusto inventore porro repellendus. Earum soluta veniam dolorum fuga, minus aperiam debitis possimus animi alias assumendasint vero aspernatur ratione blanditiis eius. Reiciendis libero voluptatum architecto, fugiat provident accusantiumdeleniti quas, sapiente nam ab quia. Cum id facere quibusdam reiciendis culpa possimus consectetur quis. Eligendi quidemfugit mollitia cum alias aliquam sit hic, laborum, officia,numquam fugiat vel at! Esse quaerat unde dignissimos voluptates non. Vero id, magni veniam animi fuga odio neque esse deleniti praesentium? ",
   },
   {
      title: "Upload documents",
      duration: "1mins 15secs",
      date_uploaded: "7 days ago",
      id: uuidv4(),
      category: "documents",
      description:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis quos dicta quasi praesentium, natus, sapiente labore accusantium, nesciunt nostrum reprehenderit doloribus nihiliusto inventore porro repellendus. Earum soluta veniam dolorum fuga, minus aperiam debitis possimus animi alias assumendasint vero aspernatur ratione blanditiis eius. Reiciendis libero voluptatum architecto, fugiat provident accusantiumdeleniti quas, sapiente nam ab quia. Cum id facere quibusdam reiciendis culpa possimus consectetur quis. Eligendi quidemfugit mollitia cum alias aliquam sit hic, laborum, officia,numquam fugiat vel at! Esse quaerat unde dignissimos voluptates non. Vero id, magni veniam animi fuga odio neque esse deleniti praesentium? ",
   },
   {
      title: "Share documents to admin",
      duration: "1mins 15secs",
      date_uploaded: "7 days ago",
      id: uuidv4(),
      category: "documents",
      description: "",
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
      service_id: uuidv4(),
      status: "pending",
      requestDate: "2024-08-30",
      service_title: "tax",
   },
   {
      service_id: uuidv4(),
      status: "completed",
      requestDate: "2024-08-25",
      service_title: "attestation",
   },
   {
      service_id: uuidv4(),
      status: "paid",
      requestDate: "2024-06-25",
      service_title: "payment",
   },
];

export const cards: CardsProps[] = [
   {
      id: "card1",
      name: "Debit card",
      last4: "4364",
      exp: "12/22",
      brand: "Visa",
      cardholderName: "John Doe",
      isDefault: true,
      transactions: [
         {
            id: "txn_01",
            date: "2024-08-01",
            description: "Grocery Store",
            amount: 50.25,
            currency: "USD",
            status: "success",
         },
         {
            id: "txn_02",
            date: "2024-08-05",
            description: "Flight Ticket",
            amount: 250.0,
            currency: "USD",
            status: "failed",
         },
         {
            id: "txn_03",
            date: "2024-08-10",
            description: "Restaurant",
            amount: 80.15,
            currency: "USD",
            status: "pending",
         },
         {
            id: "txn_04",
            date: "2024-08-15",
            description: "Refund - Online Purchase",
            amount: 100.0,
            currency: "USD",
            status: "processing",
         },
         {
            id: "txn_05",
            date: "2024-07-15",
            description: "Refund - Online Purchase",
            amount: 100.0,
            currency: "USD",
            status: "processing",
         },
         {
            id: "txn_06",
            date: "2024-08-25",
            description: "Refund - Online Purchase",
            amount: 100.0,
            currency: "USD",
            status: "success",
         },
         {
            id: "txn_07",
            date: "2024-08-26",
            description: "Refund - Online Purchase",
            amount: 100.0,
            currency: "USD",
            status: "processing",
         },
      ],
   },
   {
      id: "card2",
      name: "Travel card",
      last4: "1234",
      exp: "09/23",
      brand: "Mastercard",
      cardholderName: "Jane Smith",
      isDefault: false,
      transactions: [
         {
            id: "txn_01",
            date: "2024-08-01",
            description: "Grocery Store",
            amount: 50.25,
            currency: "USD",
            status: "success",
         },
         {
            id: "txn_02",
            date: "2024-08-05",
            description: "Flight Ticket",
            amount: 250.0,
            currency: "USD",
            status: "failed",
         },
         {
            id: "txn_03",
            date: "2024-08-10",
            description: "Restaurant",
            amount: 80.15,
            currency: "USD",
            status: "pending",
         },
         {
            id: "txn_04",
            date: "2024-08-15",
            description: "Refund - Online Purchase",
            amount: 100.0,
            currency: "USD",
            status: "processing",
         },
      ],
   },
   {
      id: "card3",
      name: "Work card",
      last4: "3456",
      exp: "10/24",
      brand: "Visa",
      cardholderName: "John Doe",
      isDefault: false,
      transactions: [
         {
            id: "txn_01",
            date: "2024-08-01",
            description: "Grocery Store",
            amount: 50.25,
            currency: "USD",
            status: "success",
         },
         {
            id: "txn_02",
            date: "2024-08-05",
            description: "Flight Ticket",
            amount: 250.0,
            currency: "USD",
            status: "failed",
         },
         {
            id: "txn_03",
            date: "2024-08-10",
            description: "Restaurant",
            amount: 80.15,
            currency: "USD",
            status: "pending",
         },
         {
            id: "txn_04",
            date: "2024-08-15",
            description: "Refund - Online Purchase",
            amount: 100.0,
            currency: "USD",
            status: "processing",
         },
      ],
   },
];

export const invoiceMetrics: MetricCardProps[] = [
   {
      amount: 15,
      percentage: 20,
      invoice_status: "paid",
      is_percentage_increase: false,
   },
   {
      amount: 23,
      percentage: 10,
      invoice_status: "pending",
      is_percentage_increase: true,
   },
   {
      amount: 13,
      percentage: 8,
      invoice_status: "overdue",
      is_percentage_increase: true,
   },
   {
      amount: 10,
      percentage: 19,
      invoice_status: "failed",
      is_percentage_increase: false,
   },
];

// chat data
export const chats: ChatsPropType[] = [
   {
      title: "John Doe",
      service_id: "string",
      id: uuidv4(),
      chat_access: ChatAccessStatus.ON,
      messages: [
         {
            id: uuidv4(),
            text: "Hello there",
            timestamp: "2024-10-16T09:50:00",
            type: MessageType.outgoing,
            documents: [],
         },
         {
            id: uuidv4(),
            text: "I need some help with my taxes",
            timestamp: "2024-10-16T10:01:00",
            type: MessageType.outgoing,
            documents: [],
         },
         {
            id: uuidv4(),
            text: "Sure, I can help.",
            timestamp: "2024-10-16T10:01:30",
            type: MessageType.incoming,
            documents: [],
         },
         {
            id: uuidv4(),
            text: "What do you want me to help you with exactly?",
            timestamp: "2024-10-16T12:02:00",
            type: MessageType.incoming,
            documents: [],
         },
         {
            id: uuidv4(),
            text: "Okayy.. what i want you to do for me is that, i would like for you to send in a list of required documents.",
            timestamp: "2024-10-17T09:06:00",
            type: MessageType.outgoing,
            documents: [],
         },
         {
            id: uuidv4(),
            text: "Okay, great.",
            timestamp: "2024-10-17T10:01:00",
            type: MessageType.incoming,
            documents: [],
         },
         {
            id: uuidv4(),
            text: "I'll send in the list of documents that would be required of you",
            timestamp: "2024-10-17T10:05:00",
            type: MessageType.incoming,
            documents: [],
         },
         {
            id: uuidv4(),
            text: "Kindly standby, as it would take a few minutes",
            timestamp: "2024-10-17T10:06:00",
            type: MessageType.incoming,
            documents: [],
         },
         {
            id: uuidv4(),
            text: "okayy.. Great. I will be waiting for a feedback. Thanks",
            timestamp: "2024-10-17T10:05:58",
            type: MessageType.outgoing,
            documents: [],
         },

         {
            id: uuidv4(),
            text: "Hi",
            timestamp: "2024-10-18T11:31:00",
            type: MessageType.outgoing,
            documents: [],
         },
         {
            id: uuidv4(),
            text: "Good afternoon",
            timestamp: "2024-10-18T12:10:00",
            type: MessageType.outgoing,
            documents: [],
         },
         {
            id: uuidv4(),
            text: "Hello. Are you there?",
            timestamp: "2024-10-18T13:01:00",
            type: MessageType.outgoing,
            documents: [],
         },
      ],
   },
   {
      title: "Jane Smith",
      service_id: "string",
      id: uuidv4(),
      chat_access: ChatAccessStatus.ON,
      messages: [
         {
            id: uuidv4(),
            text: "Can you assist me with this?",
            timestamp: "2024-10-16T09:30:00",
            type: MessageType.incoming,
            documents: [],
         },
      ],
   },
   {
      title: "Jane Doe",
      service_id: "string",
      id: uuidv4(),
      chat_access: ChatAccessStatus.OFF,
      messages: [
         {
            id: uuidv4(),
            text: "Can you assist me with this?",
            timestamp: "2024-10-16T09:30:00",
            type: MessageType.incoming,
            documents: [],
         },
      ],
   },
   {
      title: "John Doe",
      service_id: "string",
      id: uuidv4(),
      chat_access: ChatAccessStatus.OFF,
      messages: [
         {
            id: uuidv4(),
            text: "Hello, I need help",
            timestamp: "2024-10-17T10:00:00",
            type: MessageType.incoming,
            documents: [],
         },
         {
            id: uuidv4(),
            text: "Sure, I can help.",
            timestamp: "2024-10-17T10:01:00",
            type: MessageType.outgoing,
            documents: [],
         },
      ],
   },
];
