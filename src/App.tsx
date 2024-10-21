import "./style/App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/my-expense">
        <Routes>
          <Route path="/*" element={<AppRoutes />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
