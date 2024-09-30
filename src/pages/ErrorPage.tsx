import { Button } from "@/components/ui/button";
import { useRouteError, useNavigate, useLocation } from "react-router-dom";

type Error = {
   data?: string;
   status?: string;
   statusText?: string;
   message?: string; // For JavaScript errors
};

type ErrorPageProps = {
   error?: Error; // Accepting error from ErrorBoundary
   resetErrorBoundary?: () => void; // Used for ErrorBoundary reset
};

export const ErrorPage = ({
   error: boundaryError,
   resetErrorBoundary,
}: ErrorPageProps) => {
   // Hook to capture route-specific errors
   const routeError = useRouteError();
   const navigate = useNavigate();
   const location = useLocation();

   // Use boundaryError or routeError; fallback to custom 404 error
   const error = boundaryError ||
      routeError || { status: 404, statusText: "Looks like you got lost" };

   // Type guard to check if the error is of type 'Error'
   const isError = (error: unknown): error is Error => {
      return (
         typeof error === "object" &&
         error !== null &&
         ("data" in error ||
            "message" in error ||
            "status" in error ||
            "statusText" in error)
      );
   };
   const isSettings = location.pathname.startsWith("/settings");

   return (
      <div
         id="error-page"
         className={`relative w-full ${isSettings && "h-full"} flex flex-col gap-6 justify-center items-center dark:bg-eerieBlack px-6 overflow-hidden`}
      >
         <div className="centered-circle w-[399px] h-[399px] md:w-[599px] md:h-[599px] bg-richElectricBlue bg-opacity-[0.03] rounded-full -z-0"></div>
         <div className="centered-circle w-[599px] h-[599px] md:w-[799px] md:h-[799px] bg-richElectricBlue bg-opacity-[0.03] rounded-full -z-0"></div>
         <div className="centered-circle w-[799px] h-[799px] md:w-[999px] md:h-[999px] bg-richElectricBlue bg-opacity-[0.03] rounded-full -z-0"></div>
         {isError(error) && (
            <div className="flex flex-col items-center gap-4 text-center z-50">
               <h1 className="text-7xl md:text-9xl font-extrabold text-richElectricBlue">
                  {error.status || "Error"}!
               </h1>
               <p className="text-lg md:text-2xl text-mutedGray dark:text-chineseWhite font-bold tracking-wider">
                  {error.statusText || "Looks like something went wrong.."}
               </p>
               {error.message ? (
                  <p className="text-sm md:text-lg font-medium">
                     {error.message}
                  </p>
               ) : (
                  <p className="text-xs md:text-sm">
                     The page you're looking for doesn't exist or has been
                     moved.
                  </p>
               )}
               {error.data && (
                  <p className="text-xs md:text-sm">{error.data}</p>
               )}
               <Button
                  onClick={() =>
                     error.message ? window.location.reload() : navigate(-1)
                  }
                  variant="default"
                  className="mt-4 md:w-40 md:mt-6 w-40"
               >
                  {error.message ? "Reload page" : "Go back"}
               </Button>
            </div>
         )}
         {resetErrorBoundary && (
            <Button
               onClick={resetErrorBoundary}
               className="mt-4 md:w-40 md:mt-6 w-40"
            >
               Try Again
            </Button>
         )}
      </div>
   );
};
