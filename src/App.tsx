"use client";
import { ErrorBoundary } from "react-error-boundary";
import { Router } from "@/routes/Router";
import ContextProvider from "@/provider/ContextProvider";
import { ErrorPage } from "@/pages/ErrorPage";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="App min-h-screen flex content-center">
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <ContextProvider>
          <Toaster
            expand={true}
            richColors
            visibleToasts={3}
            gap={14}
            position="top-right"
          />
          <Router />
        </ContextProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
