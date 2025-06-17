import {  collection, query, where, getDocs, onSnapshot, Timestamp, addDoc } from "firebase/firestore";
import { getMonthRange } from "../utils/date";
import { EFirebaseCollections } from "./service";
import { db } from "./firebase.config";
import { IMonthlyPayment } from "../interface/monthly-payment";

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

  export const getMonthlyPaid = async (userId: string, month: number, year: number) => {
    try {
      const monthlyPaymentsRef = collection(db, EFirebaseCollections.MONTHLY_PAYMENTS);
  
      const q = query(
        monthlyPaymentsRef,
        where("userId", "==", userId),
        where("month", "==", month),
        where("year", "==", year)
      );
  
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs[0]?.data()?.isPaid;
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  export const addUpdateMonthlyPayment = async (data: IMonthlyPayment) => {
    try {
      const collectionRef = collection(db, EFirebaseCollections.MONTHLY_PAYMENTS);
      await addDoc(collectionRef, data);
    } catch (error) {
      console.error("Error addUpdateMonthlyPayment document:", error);
    }
  }
  