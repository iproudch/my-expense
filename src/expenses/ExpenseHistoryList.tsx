import { useState, useEffect, useMemo } from "react";
import { IExpense } from "../interface/expenses";
import { getAllExpenses } from "../service/service";
import { ExpenseList } from "./ExpenseList";

export function ExpenseHistoryList() {
  const [expensesData, setExpensesData] = useState<IExpense[]>([]);

  useEffect(() => {
    getAllExpenses().then(setExpensesData);
  }, []);

  return <ExpenseList expenses={expensesData} />;
}
