import { ExpenseList } from "./ExpenseList";
import Header from "../Header";
import useExpenses from "../hooks/useExpenses";
import { useAuth } from "../context/UserProvider";

export function ExpenseHistoryList() {
  const { userId } = useAuth();
  const { expenses } = useExpenses(userId as string);

  return (
    <div className=" flex flex-col w-96 gap-4">
      <Header title="History" />
      <ExpenseList expenses={expenses} showOptions={true} />
    </div>
  );
}
