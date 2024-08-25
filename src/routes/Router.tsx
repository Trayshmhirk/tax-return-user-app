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
import PageLoader from "../components/loaders/PageLoader";
import ProtectedRoute from "./ProtectedRoute";
import SettingsLayout from "../layouts/SettingsLayout";

// Lazy-loaded pages
const Login = lazy(() => import("../pages/auth/Login"));
const SignUp = lazy(() => import("../pages/auth/SignUp"));
const Home = lazy(() => import("../pages/home/Home"));
const RequestService = lazy(() => import("../pages/RequestService"));
const AddCard = lazy(() => import("../pages/payment/AddCard"));
const NotApprovedHome = lazy(() => import("../pages/home/NotApprovedHome"));
const Documents = lazy(() => import("../pages/Documents"));
const Receipts = lazy(() => import("../pages/Receipts"));
const LiveChat = lazy(() => import("../pages/LiveChat"));
const Bank = lazy(() => import("../pages/payment/Bank"));
const KnowledgeBase = lazy(() => import("../pages/KnowledgeBase"));
const Video = lazy(() => import("../pages/Video"));
const Profile = lazy(() => import("../pages/settings/Profile"));
const Terms = lazy(() => import("../pages/settings/Terms"));
const Help = lazy(() => import("../pages/settings/Help"));
const Privacy = lazy(() => import("../pages/settings/Privacy"));
const Faq = lazy(() => import("../pages/settings/Faq"));
const MyRequests = lazy(() => import("../pages/settings/MyRequests"));
const MyFiles = lazy(() => import("../pages/settings/MyFiles"));
const UploadDocument = lazy(() => import("../pages/UploadDocument"));

const router = createBrowserRouter(
   createRoutesFromElements(
      <>
         {/* Login */}
         <Route
            element={
               <Suspense fallback={<PageLoader />}>
                  <FormLayout />
               </Suspense>
            }
         >
            <Route path="login" element={<Login />} />
         </Route>

         {/* Sign up */}
         <Route
            element={
               <Suspense fallback={<PageLoader />}>
                  <FormLayout />
               </Suspense>
            }
         >
            <Route path="sign-up" element={<SignUp />} />
         </Route>

         <Route
            path="/"
            element={
               <Suspense fallback={<PageLoader />}>
                  <MainLayout />
               </Suspense>
            }
            errorElement={<ErrorPage />}
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
               path="bank"
               element={
                  <ProtectedRoute>
                     <Bank />
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
               path="settings/"
               element={
                  <Suspense fallback={<PageLoader />}>
                     <SettingsLayout />
                  </Suspense>
               }
               errorElement={<ErrorPage />}
            >
               <Route
                  path="profile"
                  element={
                     <ProtectedRoute>
                        <Profile />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="my-requests"
                  element={
                     <ProtectedRoute>
                        <MyRequests />
                     </ProtectedRoute>
                  }
               />
               <Route path="terms-and-conditions" element={<Terms />} />
               <Route path="help-and-support" element={<Help />} />
               <Route path="privacy-policy" element={<Privacy />} />
               <Route path="faq" element={<Faq />} />
               <Route
                  path="my-files"
                  element={
                     <ProtectedRoute>
                        <MyFiles />
                     </ProtectedRoute>
                  }
               />
            </Route>

            <Route
               path="upload-document"
               element={
                  <ProtectedRoute>
                     <UploadDocument />
                  </ProtectedRoute>
               }
            />
         </Route>

         <Route path="*" element={<ErrorPage />} />
      </>
   )
);

export const Router = () => {
   return <RouterProvider router={router} />;
};
