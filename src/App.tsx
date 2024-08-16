"use client";
import { ErrorBoundary } from "react-error-boundary";
import { Router } from "./routes/Router";
import { SidebarProvider } from "./context/SidebarContext";
import { ErrorPage } from "./pages/ErrorPage";

function App() {
   return (
      <div className="App min-h-screen flex content-center">
         <ErrorBoundary FallbackComponent={ErrorPage}>
            <SidebarProvider>
               <Router />
            </SidebarProvider>
         </ErrorBoundary>
      </div>
   );
}

export default App;
