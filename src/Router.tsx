import {
   createBrowserRouter,
   createRoutesFromElements,
   RouterProvider,
   Route,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import NotApprovedHome from "./pages/NotApprovedHome";

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
         <Route index element={<Home />} />
         <Route path="not-approved" element={<NotApprovedHome />} />
      </Route>
   )
);

export const Router = () => {
   return <RouterProvider router={router} />;
};
