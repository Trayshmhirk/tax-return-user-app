import {
   createBrowserRouter,
   createRoutesFromElements,
   RouterProvider,
   Route,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import RequestService from "./pages/RequestService";
import NotApprovedHome from "./pages/NotApprovedHome";
import Documents from "./pages/Documents";
import Receipts from "./pages/Receipts";
import LiveChat from "./pages/LiveChat";
import KnowledgeBase from "./pages/KnowledgeBase";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import { ErrorPage } from "./pages/ErrorPage";
import Terms from "./pages/Terms";
import Help from "./pages/Help";
import Privacy from "./pages/Privacy";
import Faq from "./pages/Faq";
import UploadDocument from "./pages/UploadDocument";
import MyRequests from "./pages/MyRequests";
import Video from "./pages/Video";
import AddCard from "./pages/AddCard";

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
         <Route index element={<Home />} />
         <Route path="request-service" element={<RequestService />} />
         <Route path="add-card" element={<AddCard />} />
         <Route path="not-approved" element={<NotApprovedHome />} />
         <Route path="documents" element={<Documents />} />
         <Route path="receipts" element={<Receipts />} />
         <Route path="live-chat" element={<LiveChat />} />
         <Route path="documents" element={<Documents />} />
         <Route path="knowledge-base/" element={<KnowledgeBase />}>
            <Route path="video/:videoId" element={<Video />}></Route>
            {/* <Route path="video/" element={<KnowledgeBase />}>
               <Route path=":videoId" element={<KnowledgeBase />} />
            </Route> */}
         </Route>
         <Route path="transactions" element={<Transactions />} />
         <Route path="profile/" element={<Profile />}>
            <Route path="my-requests" element={<MyRequests />} />
         </Route>
         <Route path="terms-and-conditions" element={<Terms />} />
         <Route path="help-and-support" element={<Help />} />
         <Route path="privacy-policy" element={<Privacy />} />
         <Route path="faq" element={<Faq />} />
         <Route path="upload-document" element={<UploadDocument />} />
      </Route>
   )
);

export const Router = () => {
   return <RouterProvider router={router} />;
};
