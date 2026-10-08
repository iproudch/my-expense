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
import { Link } from "react-router-dom";
import { IExpense } from "../interface/expenses";
import { db } from "../service/firebase.config";
import { RecentExpenseList } from "./RecentExpenseList";
import { useAuth } from "../context/UserProvider";

export default function Expenses() {
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) return;
    const expensesRef = collection(db, EFirebaseCollections.EXPENSES);
    const q = query(
      expensesRef,
      where("userId", "==", userId),
      orderBy("date", "desc"),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      setExpenses(await getExpenses(snapshot));
    });

    return () => unsubscribe();
  }, [userId]);

  return (
    <>
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-semibold text-white">Recent</h2>
        <Link to="/history" className="text-base font-medium text-[#8f8bff]">
          See all
        </Link>
      </div>
      <RecentExpenseList expenses={expenses} />
    </>
  );
}
