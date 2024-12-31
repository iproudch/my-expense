import {  collection, query, where, getDocs, onSnapshot, Timestamp } from "firebase/firestore";
import { getMonthRange } from "../utils/date";
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
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let totalAmount = 0;
  
      snapshot.forEach((doc) => {
        totalAmount += doc.data().amount;
      });
  
      callback(totalAmount);
    });
  
    return unsubscribe;
  };
  
  const getMonthRangeFirestore = (year: number, month: number) => {
    const startDate = new Date(year, month - 1, 1); // First day of the month
    const endDate = new Date(year, month, 0, 23, 59, 59, 999); // Last day of the month
    return {
      start: Timestamp.fromDate(startDate),
      end: Timestamp.fromDate(endDate),
    };
  };
  
  export const getTotalMonthlyExpenses = async (userId: string, sharing: boolean, month: number, year: number) => {
    try {
      const { start, end } = getMonthRangeFirestore(year, month);
      const expensesRef = collection(db, EFirebaseCollections.EXPENSES);
  
      const q = query(
        expensesRef,
        where("userId", "==", userId),
        where("sharing", "==", sharing),
        where("date", ">=", start),
        where("date", "<=", end)
      );
  
      const querySnapshot = await getDocs(q);
      const expenses = querySnapshot.docs.map(doc => ({ id: doc.id, amount: doc.data().amount, ...doc.data() }));
  
      const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
      return total;
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };
  