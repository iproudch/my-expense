import { addDoc, collection, getDocs, query, QuerySnapshot, where } from "firebase/firestore";
import { db } from "./firebase.config";
import { IAddExpenseForm } from "../add/AddFormProvider";
import { IExpense } from "../interface/expenses";
import { date } from "yup";
import { format } from "date-fns";

export enum EFirebaseCollections {
  EXPENSES = "Expenses",
}

export async function addExpense(data: IAddExpenseForm) {
  try {
    const collectionRef = collection(db, EFirebaseCollections.EXPENSES);
    await addDoc(collectionRef, data);
  } catch (error) {
    console.error("Error adding document:", error);
  }
}

export async function getExpenses(
  snapshot: QuerySnapshot
): Promise<IExpense[]> {
  try {
    if (!snapshot.empty) {
      const data = snapshot.docs.map((doc) => {
        const data = doc.data();
        const dateDisplay = format(data.date.toDate(), "dd MMM yy");
        return {
          ...data,
          id: doc.id,
          date: dateDisplay,
        };
      });
      return data as IExpense[];
    } else {
      console.log("No documents found in the collection.");
      return [];
    }
  } catch (error) {
    console.error("Error processing snapshot data:", error);
    return [];
  }
}

export async function getAllExpenses(): Promise<IExpense[]> {
  try {
    const collectionRef = collection(db, EFirebaseCollections.EXPENSES);
    const querySnapshot = await getDocs(collectionRef);

    if (!querySnapshot.empty) {
      const data = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(), // Converts Timestamp to Date
        };
      });
      return data as IExpense[];
    } else {
      console.log("No documents found in the collection.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching collection data:", error);
    return [];
  }
}
