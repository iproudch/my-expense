import { getFirestore, collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { getMonthRange } from "../utils/range";
import { EFirebaseCollections } from "./service";
import { db } from "./firebase.config";

export const getTotalExpensesForMonth = async (userId: string) => {
    const { startOfMonth, endOfMonth } = getMonthRange();
  
    const expensesRef = collection(db, EFirebaseCollections.EXPENSES);
    const q = query(
      expensesRef,
      where('userId', '==', userId),
      where('date', '>=', startOfMonth),
      where('date', '<=', endOfMonth)
    );
  
    const querySnapshot = await getDocs(q);
    let totalAmount = 0;
  
    querySnapshot.forEach((doc) => {
      totalAmount += doc.data().amount;
    });
    return totalAmount;
  };


  export const subscribeToTotalExpensesForMonth = (userId: string, callback: (total: number) => void) => {
    const { startOfMonth, endOfMonth } = getMonthRange();
  
    const expensesRef = collection(db, EFirebaseCollections.EXPENSES);
    const q = query(
      expensesRef,
      where('userId', '==', userId),
      where('date', '>=', startOfMonth),
      where('date', '<=', endOfMonth)
    );
  
    // Real-time listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let totalAmount = 0;
  
      snapshot.forEach((doc) => {
        totalAmount += doc.data().amount;
      });
  
      // Call the provided callback with the new total
      callback(totalAmount);
    });
  
    // Return unsubscribe function to stop listening when the component unmounts
    return unsubscribe;
  };
  