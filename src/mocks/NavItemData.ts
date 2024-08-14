import { GoHome } from "react-icons/go";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineReceiptLong } from "react-icons/md";
import { BsChat } from "react-icons/bs";
import { MdOutlineCreditCard } from "react-icons/md";
import { MdOutlineNewspaper } from "react-icons/md";
import { GrBarChart } from "react-icons/gr";

export const navItemsData = [
   {
      title: "Home",
      navIcon: GoHome,
      route: "",
      id: "homeNavItem",
      tourContent: "See all the key functionalities of the web app",
   },
   {
      title: "Documents",
      navIcon: IoCloudUploadOutline,

      route: "documents",
      id: "documentsNavItem",
      tourContent: "View all scanned and uploaded documents",
   },
   {
      title: "Receipts",
      navIcon: MdOutlineReceiptLong,
      route: "receipts",
      id: "receiptsNavItem",
      tourContent: "Upload and view all business related receipts",
   },
   {
      title: "Live Chat",
      navIcon: BsChat,
      route: "live-chat",
      id: "liveChatNavItem",
      tourContent: "Chat with and agent to get assistance ",
   },
   {
      title: "Transactions",
      navIcon: GrBarChart,
      route: "transactions",
      id: "transactionsNavItem",
      tourContent: "See all transactions related to Okeh CPA",
   },
   {
      title: "Credit cards",
      navIcon: MdOutlineCreditCard,
      route: "credit-cards",
      id: "cardsNavItem",
      tourContent: "See annum based tax filing for previous years",
   },
   {
      title: "Knowledge base",
      navIcon: MdOutlineNewspaper,
      route: "knowledge-base",
      id: "knowledgeBaseNavItem",
      tourContent: "Watch tutorials on how to effectively use the app",
   },
];
