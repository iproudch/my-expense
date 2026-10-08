import { IExpense } from "../interface/expenses";
import { Loader } from "../Loader";
import { ExpenseRow } from "./ExpenseRow";

type RecentExpenseListProps = {
  expenses: IExpense[];
};

export function RecentExpenseList({ expenses }: RecentExpenseListProps) {
  if (expenses.length === 0) return <Loader />;

  return (
    <ul className="w-full rounded-3xl bg-[#23262f] px-5 py-2 text-[#e9eaf0]">
      {expenses.map((item) => (
        <ExpenseRow key={item.id} item={item} />
      ))}
    </ul>
  );
}
