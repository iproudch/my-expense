import "./style/App.css";
import Summary from "./summary/Summary";
import { Menu } from "./Menu";
import Expenses from "./expenses/Expenses";
import { AddModal } from "./add/AddModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen gap-4">
        <h1>My Expense</h1>
        <Summary />
        <Expenses />
        <AddModal />
        <div className="mt-auto">
          <Menu />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
