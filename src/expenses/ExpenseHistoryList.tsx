import { useMemo, useState } from "react";
import { format, parse } from "date-fns";
import { useAuth } from "../context/UserProvider";
import useRecentMonthsExpenses from "../hooks/useRecentMonthsExpenses";
import { CURRENCY } from "../constants";
import { deleteExpense } from "../service/service";
import { ExpenseRow } from "./ExpenseRow";
import { Loader } from "../Loader";
import PageHeader from "../PageHeader";
import { EFilter } from "../interface/expenses";


export function ExpenseHistoryList() {
  const { userId } = useAuth();
  const expenses = useRecentMonthsExpenses(userId);
  const [filter, setFilter] = useState<EFilter>(EFilter.ALL);

  const categories = useMemo(
    () => [EFilter.ALL, ...new Set(expenses.map((e) => e.category))],
    [expenses]
  );

  const expensesGrouped = useMemo(() => {
    const byMonth = new Map<string, typeof expenses>();
    expenses
      .filter((e) => filter === EFilter.ALL || e.category === filter)
      .forEach((e) => {
        const month = format(
          parse(e.date ?? "", "dd MMM yy", new Date()),
          "MMMM yyyy"
        );
        byMonth.set(month, [...(byMonth.get(month) ?? []), e]);
      });
    return [...byMonth.entries()];
  }, [expenses, filter]);

  return (
    <div className="flex w-full flex-col gap-4">
      <PageHeader subtitle={`${expenses.length} expenses`} title="History" />

      <div className="flex gap-3 overflow-x-auto px-2 pb-1">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            className={`shrink-0 rounded-full border px-5 py-2 text-base font-medium ${
              filter === category
                ? "border-[#7b78ff] bg-[#7b78ff] text-[#14141c]"
                : "border-[#34365a] bg-transparent text-[#a5a0f9]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {expenses.length === 0 ? (
        <Loader />
      ) : (
        expensesGrouped.map(([month, items]) => (
          <section key={month} className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-2 text-[#a0a4b3]">
              <h2 className="text-lg font-semibold">{month}</h2>
              <span>
                {items.reduce((sum, e) => sum + e.amount, 0).toLocaleString()}{" "}
                {CURRENCY}
              </span>
            </div>
            <ul className="w-full rounded-3xl bg-[#23262f] px-5 py-2 text-[#e9eaf0]">
              {items.map((item) => (
                <ExpenseRow key={item.id} item={item} onDelete={deleteExpense} />
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
