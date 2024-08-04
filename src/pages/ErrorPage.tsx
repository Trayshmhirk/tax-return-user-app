import { useRouteError } from "react-router-dom";

type Error = {
   data: string;
   status: string;
   statusText: string;
};

export const ErrorPage = () => {
   const error = useRouteError();

   // Type guard to check if the error is of type 'Error'
   const isError = (error: unknown): error is Error => {
      return (
         typeof error === "object" &&
         error !== null &&
         "data" in error &&
         "status" in error &&
         "statusText" in error
      );
   };

   return (
      <div
         id="error-page"
         className="w-full flex flex-col gap-6 justify-center items-center"
      >
         <h1 className="text-4xl font-bold">Oops!</h1>
         <p>Sorry, an unexpected error has occurred.</p>
         {isError(error) ? (
            <>
               <p className="text-bostonRed">{error.data}</p>
               <p className="">
                  <i>{`${error.status} ${error.statusText}`}</i>
               </p>
            </>
         ) : (
            <p className="text-bostonRed">Unknown error occurred.</p>
         )}
      </div>
   );
};
