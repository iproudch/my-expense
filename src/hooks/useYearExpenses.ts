import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../service/firebase.config";
import { EFirebaseCollections } from "../service/service";

export type YearExpense = {
  amount: number;
  category: string;
  sharing: boolean;
  month: number; // 0-based
};

export default function useYearExpenses(userId: string | undefined, year: number) {
  const [expenses, setExpenses] = useState<YearExpense[]>([]);

  useEffect(() => {
    if (!userId) return;
    setExpenses([]);
    const q = query(
      collection(db, EFirebaseCollections.EXPENSES),
      where("userId", "==", userId),
      where("date", ">=", new Date(year, 0, 1)),
      where("date", "<=", new Date(year, 11, 31, 23, 59, 59, 999))
    );
    return onSnapshot(q, (snapshot) => {
      setExpenses(
        snapshot.docs.map((doc) => {
          const { amount, category, sharing, date } = doc.data();
          return {
            amount,
            category,
            sharing: Boolean(sharing),
            month: date.toDate().getMonth(),
          };
        })
      );
    });
  }, [userId, year]);

  return expenses;
}
