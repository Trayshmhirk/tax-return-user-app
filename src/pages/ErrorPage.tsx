import CustomButton from "@/components/form-components/CustomButton";
import { useRouteError, useNavigate } from "react-router-dom";

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

   return (
      <div
         id="error-page"
         className={`w-full ${isError(error) && error.message && "h-full"} flex flex-col gap-6 justify-center items-center dark:bg-eerieBlack px-6`}
      >
         {isError(error) && (
            <div className="flex flex-col items-center gap-4 text-center">
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
               <CustomButton
                  handleClick={() =>
                     error.message ? window.location.reload() : navigate(-1)
                  }
                  type="button"
                  className="w-36 mt-4 md:w-40 md:mt-6"
               >
                  {error.message ? "Reload page" : "Go back"}
               </CustomButton>
            </div>
         )}
         {resetErrorBoundary && (
            <button
               onClick={resetErrorBoundary}
               className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
               Try Again
            </button>
         )}
      </div>
   );
};
