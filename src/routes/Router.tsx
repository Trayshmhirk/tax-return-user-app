import {
   createBrowserRouter,
   createRoutesFromElements,
   RouterProvider,
   Route,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "../layouts/MainLayout";
import FormLayout from "../layouts/FormLayout";
import { ErrorPage } from "../pages/ErrorPage";
import FullSpinner from "../components/loaders/FullSpinner";
import ProtectedRoute from "./ProtectedRoute";

// Lazy-loaded pages
const Login = lazy(() => import("../pages/auth/Login"));
const Home = lazy(() => import("../pages/Home"));
const RequestService = lazy(() => import("../pages/RequestService"));
const AddCard = lazy(() => import("../pages/AddCard"));
const NotApprovedHome = lazy(() => import("../pages/NotApprovedHome"));
const Documents = lazy(() => import("../pages/Documents"));
const Receipts = lazy(() => import("../pages/Receipts"));
const LiveChat = lazy(() => import("../pages/LiveChat"));
const KnowledgeBase = lazy(() => import("../pages/KnowledgeBase"));
const Transactions = lazy(() => import("../pages/Transactions"));
const Profile = lazy(() => import("../pages/Profile"));
const Terms = lazy(() => import("../pages/Terms"));
const Help = lazy(() => import("../pages/Help"));
const Privacy = lazy(() => import("../pages/Privacy"));
const Faq = lazy(() => import("../pages/Faq"));
const UploadDocument = lazy(() => import("../pages/UploadDocument"));
const MyRequests = lazy(() => import("../pages/MyRequests"));
const Video = lazy(() => import("../pages/Video"));

const router = createBrowserRouter(
   createRoutesFromElements(
      <>
         <Route
            element={
               <Suspense fallback={<FullSpinner />}>
                  <FormLayout />
               </Suspense>
            }
            errorElement={<ErrorPage />}
         >
            <Route path="login" element={<Login />} />
         </Route>

         <Route
            path="/"
            element={
               <Suspense fallback={<FullSpinner />}>
                  <MainLayout />
               </Suspense>
            }
         >
            <Route
               path="not-approved"
               element={
                  <ProtectedRoute>
                     <NotApprovedHome />
                  </ProtectedRoute>
               }
            />
            <Route
               index
               element={
                  <ProtectedRoute>
                     <Home />
                  </ProtectedRoute>
               }
            />
            <Route
               path="request-service"
               element={
                  <ProtectedRoute>
                     <RequestService />
                  </ProtectedRoute>
               }
            />
            <Route
               path="add-card"
               element={
                  <ProtectedRoute>
                     <AddCard />
                  </ProtectedRoute>
               }
            />
            <Route
               path="documents"
               element={
                  <ProtectedRoute>
                     <Documents />
                  </ProtectedRoute>
               }
            />
            <Route
               path="receipts"
               element={
                  <ProtectedRoute>
                     <Receipts />
                  </ProtectedRoute>
               }
            />
            <Route
               path="live-chat"
               element={
                  <ProtectedRoute>
                     <LiveChat />
                  </ProtectedRoute>
               }
            />
            <Route
               path="knowledge-base/"
               element={
                  <ProtectedRoute>
                     <KnowledgeBase />
                  </ProtectedRoute>
               }
            >
               <Route path="video/:videoId" element={<Video />}></Route>
            </Route>
            <Route
               path="transactions"
               element={
                  <ProtectedRoute>
                     <Transactions />
                  </ProtectedRoute>
               }
            />
            <Route
               path="profile/"
               element={
                  <ProtectedRoute>
                     <Profile />
                  </ProtectedRoute>
               }
            >
               <Route path="my-requests" element={<MyRequests />} />
            </Route>
            <Route path="terms-and-conditions" element={<Terms />} />
            <Route path="help-and-support" element={<Help />} />
            <Route path="privacy-policy" element={<Privacy />} />
            <Route path="faq" element={<Faq />} />
            <Route
               path="upload-document"
               element={
                  <ProtectedRoute>
                     <UploadDocument />
                  </ProtectedRoute>
               }
            />
         </Route>
         {/* <Route path="*" element={<ErrorPage />} /> */}
      </>
   )
);

export const Router = () => {
   return <RouterProvider router={router} />;
};
