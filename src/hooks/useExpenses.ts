import { onSnapshot, collection, query, where, limit, startAfter, QueryDocumentSnapshot, orderBy } from "firebase/firestore";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { db } from "../service/firebase.config";
import { EFirebaseCollections } from "../service/service";
import { IExpense } from "../interface/expenses";

export default function useExpenses(userId: string, lastDoc?: QueryDocumentSnapshot | null) {
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
  
    const collectionRef = collection(db, EFirebaseCollections.EXPENSES);
    let expensesQuery = query(
      collectionRef,
      where("userId", "==", userId),
      orderBy("date", "desc"),
      limit(10)
    );
  
    if (lastDoc) {
      expensesQuery = query(
        collectionRef,
        where("userId", "==", userId),
        orderBy("date", "desc"),
        startAfter(lastDoc),
        limit(10)
      );
    }

    const unsubscribe = onSnapshot(
      expensesQuery,
      (querySnapshot) => {
        if (!querySnapshot.empty) {
          const updatedExpenses = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            const dateDisplay = format(data.date.toDate(), "dd MMM yy");
            return {
              ...data,
              id: doc.id,
              date: dateDisplay,
            } as IExpense;
          });
          setExpenses(updatedExpenses);
        } else {
          setExpenses([]);
        }
      },
      (error) => {
        console.error("Error fetching real-time data:", error);
        setError("Error fetching real-time data.");
      }
    );
  
    return () => unsubscribe();
  }, [userId, lastDoc]);

  return { expenses, error };
}
