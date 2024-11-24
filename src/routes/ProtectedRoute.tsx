import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: ChildrenNode) => {
   const isAuthenticated = true; // Replace this with your actual authentication logic

   if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
   }

   return children;
};

export default ProtectedRoute;
