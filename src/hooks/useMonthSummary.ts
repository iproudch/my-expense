import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../service/firebase.config";
import { EFirebaseCollections } from "../service/service";

export type CategoryTotal = { category: string; total: number };

export type MonthSummary = {
  total: number;
  previousTotal: number;
  categories: CategoryTotal[];
};

const EMPTY: MonthSummary = { total: 0, previousTotal: 0, categories: [] };

export function useMonthSummary(userId?: string): MonthSummary {
  const [summary, setSummary] = useState<MonthSummary>(EMPTY);

  useEffect(() => {
    if (!userId) return;
    const now = new Date();
    const startOfPrevious = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const q = query(
      collection(db, EFirebaseCollections.EXPENSES),
      where("userId", "==", userId),
      where("date", ">=", startOfPrevious),
      where("date", "<=", endOfMonth)
    );

    return onSnapshot(q, (snapshot) => {
      let total = 0;
      let previousTotal = 0;
      const byCategory = new Map<string, number>();

      snapshot.forEach((doc) => {
        const { amount, category, date } = doc.data();
        if (date.toDate() >= startOfMonth) {
          total += amount;
          byCategory.set(category, (byCategory.get(category) ?? 0) + amount);
        } else {
          previousTotal += amount;
        }
      });

      const categories = [...byCategory.entries()]
        .map(([category, total]) => ({ category, total }))
        .sort((a, b) => b.total - a.total);

      setSummary({ total, previousTotal, categories });
    });
  }, [userId]);

  return summary;
}
