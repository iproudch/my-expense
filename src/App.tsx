import "./style/App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/my-expense/">
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
