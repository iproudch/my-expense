import "./App.css";
import Add from "./Add";
import Summary from "./assets/summary/Summary";
import { Menu } from "./Menu";
import Expenses from "./expenses/Expenses";

function App() {
  return (
    <div className="flex flex-col min-h-screen gap-4">
      <h1>My Expense</h1>
      <Summary />
      <Expenses />
      {/* <Add /> */}
      <div className="mt-auto">
        <Menu />
      </div>
    </div>
  );
}

export default App;
