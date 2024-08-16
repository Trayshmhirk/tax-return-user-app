import { Navigate } from "react-router-dom";

type ProtectedRoutePropType = {
   children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRoutePropType) => {
   const isAuthenticated = true; // Replace this with your actual authentication logic

   if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
   }

   return children;
};

export default ProtectedRoute;
