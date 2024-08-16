"use client";
import { ErrorBoundary } from "react-error-boundary";
import { Router } from "./routes/Router";
import ContextProvider from "./provider/ContextProvider";
import { ErrorPage } from "./pages/ErrorPage";

function App() {
   return (
      <div className="App min-h-screen flex content-center">
         <ErrorBoundary FallbackComponent={ErrorPage}>
            <ContextProvider>
               <Router />
            </ContextProvider>
         </ErrorBoundary>
      </div>
   );
}

export default App;
