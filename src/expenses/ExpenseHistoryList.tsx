import { ExpenseList } from "./ExpenseList";
import Header from "../Header";
import useExpenses from "../hooks/useExpenses";

export function ExpenseHistoryList() {
  const userId = "user123";
  const { expenses } = useExpenses(userId);

  return (
    <div className=" flex flex-col w-96 gap-4">
      <Header title="History" />
      <ExpenseList expenses={expenses} showOptions={true} />
    </div>
  );
}
