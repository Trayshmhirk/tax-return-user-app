import {
   createBrowserRouter,
   createRoutesFromElements,
   RouterProvider,
   Route,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "@/layouts/MainLayout";
import FormLayout from "@/layouts/FormLayout";
import { ErrorPage } from "@/pages/ErrorPage";
import PageLoader from "@/components/loaders/PageLoader";
import ProtectedRoute from "./ProtectedRoute";
import SettingsLayout from "@/layouts/SettingsLayout";

// Lazy-loaded pages
const Login = lazy(() => import("@/pages/auth/Login"));
const SignUp = lazy(() => import("@/pages/auth/SignUp"));
const Home = lazy(() => import("@/pages/home/Home"));
const NotApprovedHome = lazy(() => import("@/pages/home/NotApprovedHome"));
const UploadDocument = lazy(() => import("@/pages/features/UploadDocument"));
const Invoices = lazy(() => import("@/pages/features/Invoices"));
const Chat = lazy(() => import("@/pages/features/Chat"));
const Bank = lazy(() => import("@/pages/payment/Bank"));
const KnowledgeBase = lazy(() => import("@/pages/videos/KnowledgeBase"));
const Video = lazy(() => import("@/pages/videos/Video"));
const Profile = lazy(() => import("@/pages/settings/Profile"));
const Terms = lazy(() => import("@/pages/settings/Terms"));
const Help = lazy(() => import("@/pages/settings/Help"));
const Privacy = lazy(() => import("@/pages/settings/Privacy"));
const Faq = lazy(() => import("@/pages/settings/Faq"));
const Files = lazy(() => import("@/pages/settings/Files"));

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

         <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
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
               path="upload-documents"
               element={
                  <ProtectedRoute>
                     <UploadDocument />
                  </ProtectedRoute>
               }
            />
            <Route
               path="invoices"
               element={
                  <ProtectedRoute>
                     <Invoices />
                  </ProtectedRoute>
               }
            />
            <Route
               path="chat"
               element={
                  <ProtectedRoute>
                     <Chat />
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
               <Route
                  path="video/:videoId"
                  element={
                     <ProtectedRoute>
                        <Video />
                     </ProtectedRoute>
                  }
               ></Route>
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
               <Route path="terms-and-conditions" element={<Terms />} />
               <Route path="help-and-support" element={<Help />} />
               <Route path="privacy-policy" element={<Privacy />} />
               <Route path="faq" element={<Faq />} />
               <Route
                  path="files"
                  element={
                     <ProtectedRoute>
                        <Files />
                     </ProtectedRoute>
                  }
               />
            </Route>
         </Route>

         <Route path="*" element={<ErrorPage />} />
      </>
   )
);

export const Router = () => {
   return <RouterProvider router={router} />;
};
