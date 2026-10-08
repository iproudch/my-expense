import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../service/firebase.config";
import { EFirebaseCollections, getExpenses } from "../service/service";
import { IExpense } from "../interface/expenses";

export default function useRecentMonthsExpenses(userId?: string) {
  const [expenses, setExpenses] = useState<IExpense[]>([]);

  useEffect(() => {
    if (!userId) return;
    const now = new Date();
    const since = new Date(now.getFullYear(), now.getMonth() - 2, 1);
    const q = query(
      collection(db, EFirebaseCollections.EXPENSES),
      where("userId", "==", userId),
      where("date", ">=", since),
      orderBy("date", "desc")
    );
    return onSnapshot(q, async (snapshot) => {
      setExpenses(await getExpenses(snapshot));
    });
  }, [userId]);

  return expenses;
}
