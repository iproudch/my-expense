import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../service/firebase.config";
import { EFirebaseCollections } from "../service/service";

export default function usePaidMonths(userId: string | undefined, year: number) {
  const [paidMonths, setPaidMonths] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!userId) return;
    setPaidMonths(new Set());
    const q = query(
      collection(db, EFirebaseCollections.MONTHLY_PAYMENTS),
      where("userId", "==", userId),
      where("year", "==", year)
    );
    return onSnapshot(q, (snapshot) => {
      const months = new Set<number>();
      snapshot.forEach((doc) => {
        const { month, isPaid } = doc.data();
        if (isPaid) months.add(month - 1);
      });
      setPaidMonths(months);
    });
  }, [userId, year]);

  return paidMonths;
}
