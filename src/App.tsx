import "./App.css";
import { Router } from "./Router";
import { SidebarProvider } from "./context/SidebarContext";

function App() {
   return (
      <div className="App min-h-screen flex content-center">
         <SidebarProvider>
            <Router />
         </SidebarProvider>
      </div>
   );
}

export default App;
