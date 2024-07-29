import "./App.css";
import {
   createBrowserRouter,
   createRoutesFromElements,
   RouterProvider,
   Route,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Homepage from "./pages/Homepage";

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
         <Route index element={<Homepage />} />
      </Route>
   )
);

function App() {
   return <RouterProvider router={router} />;
}

export default App;
