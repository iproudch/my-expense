import "./style/App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<AppRoutes />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
{
  /* <div className="flex flex-col min-h-screen gap-4">
        <h1>My Expense</h1>
        <Summary />
        <Expenses />
        <AddModal />
        <div className="mt-auto">
          <Menu />
        </div>
      </div> */
}
