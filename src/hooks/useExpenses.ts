import { onSnapshot, collection, query, where, limit, startAfter, QueryDocumentSnapshot } from "firebase/firestore";
import { format } from "date-fns"; // For date formatting
import { useState, useEffect } from "react"; // React hooks
import { db } from "../service/firebase.config";
import { EFirebaseCollections } from "../service/service";
import { IExpense } from "../interface/expenses";

export default function useExpenses(userId: string, lastDoc?: QueryDocumentSnapshot | null) {
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return; // Skip if no userId is provided

    const collectionRef = collection(db, EFirebaseCollections.EXPENSES);

    // Create a query to filter by userId and limit to 10 records
    let expensesQuery = query(
      collectionRef,
      where("userId", "==", userId),
      limit(10)
    );

    // If lastDoc is provided, paginate using startAfter
    if (lastDoc) {
      expensesQuery = query(expensesQuery, startAfter(lastDoc));
    }

    // Set up real-time listener using onSnapshot
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
          setExpenses([]); // No documents found, set expenses to an empty array
        }
      },
      (error) => {
        console.error("Error fetching real-time data:", error);
        setError("Error fetching real-time data.");
      }
    );

    // Cleanup the listener on component unmount or when userId changes
    return () => unsubscribe();
  }, [userId, lastDoc]);

  return { expenses, error };
}
