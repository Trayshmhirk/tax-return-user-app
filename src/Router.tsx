import {
   createBrowserRouter,
   createRoutesFromElements,
   RouterProvider,
   Route,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import NotApprovedHome from "./pages/NotApprovedHome";
import Documents from "./pages/Documents";
import Receipts from "./pages/Receipts";
import LiveChat from "./pages/LiveChat";
import PreviousFiling from "./pages/PreviousFiling";
import KnowledgeBase from "./pages/KnowledgeBase";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
         <Route index element={<Home />} />
         <Route path="not-approved" element={<NotApprovedHome />} />
         <Route path="documents" element={<Documents />} />
         <Route path="receipts" element={<Receipts />} />
         <Route path="live-chat" element={<LiveChat />} />
         <Route path="documents" element={<Documents />} />
         <Route path="previous-filing" element={<PreviousFiling />} />
         <Route path="knowledge-base" element={<KnowledgeBase />} />
         <Route path="transactions" element={<Transactions />} />
         <Route path="profile" element={<Profile />} />
      </Route>
   )
);

export const Router = () => {
   return <RouterProvider router={router} />;
};
