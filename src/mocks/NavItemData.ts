import { GoHome } from "react-icons/go";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineReceiptLong } from "react-icons/md";
import { BsChat } from "react-icons/bs";
import { LuLandmark } from "react-icons/lu";
import { MdOutlineNewspaper } from "react-icons/md";

export const navItemsData = [
   {
      title: "Home",
      navIcon: GoHome,
      route: "",
      id: "homeNavItem",
   },
   {
      title: "Documents",
      navIcon: IoCloudUploadOutline,
      route: "upload-documents",
      id: "uploadNavItem",
   },
   {
      title: "Receipts",
      navIcon: MdOutlineReceiptLong,
      route: "receipts",
      id: "receiptsNavItem",
   },
   {
      title: "Chat",
      navIcon: BsChat,
      route: "chat",
      id: "chatNavItem",
   },
   {
      title: "Bank",
      navIcon: LuLandmark,
      route: "bank",
      id: "bankNavItem",
   },
   {
      title: "Knowledge base",
      navIcon: MdOutlineNewspaper,
      route: "knowledge-base",
      id: "knowledgeBaseNavItem",
   },
];
