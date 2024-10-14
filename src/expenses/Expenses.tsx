import { EFirebaseCollections, getExpenses } from "../service/service";
import {
  query,
  collection,
  onSnapshot,
  limit,
  orderBy,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { IExpense } from "../interface/expenses";
import { db } from "../service/firebase.config";
import { ExpenseList } from "./ExpenseList";

export default function Expenses() {
  // const { data: expenses, isLoading } = useQuery({
  //   queryKey: ["expenses"],
  //   queryFn: getExpenses,
  // });

  const [expenses, setExpenses] = useState<IExpense[]>([]);

  const userId = "user123";
  useEffect(() => {
    if (!userId) return;
    const expensesRef = collection(db, EFirebaseCollections.EXPENSES);
    const q = query(
      expensesRef,
      where("userId", "==", userId),
      orderBy("date", "desc"),
      limit(4)
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const expensesData = await getExpenses(snapshot);
      setExpenses(expensesData.reverse());
    });

    return () => unsubscribe();
  }, [userId]);

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">Recent</h2>
        {/* TODO: next phase */}
        {/* <p className="font-semibold text-sm" style={{ cursor: "pointer" }}>
          View all
        </p> */}
      </div>
      {expenses ? <ExpenseList expenses={expenses} /> : null}
    </>
  );
}
