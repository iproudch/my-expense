import { addDoc, collection, deleteDoc, doc, getDocs, limit, query, QueryDocumentSnapshot, QuerySnapshot, startAfter, where } from "firebase/firestore";
import { db } from "./firebase.config";
import { IAddExpenseForm } from "../add/AddFormProvider";
import { IExpense } from "../interface/expenses";
import { format } from "date-fns";

export enum EFirebaseCollections {
  MASTER_DATA = "master-data",
  EXPENSES = "expenses",
  USERS = "users",
}

export async function addExpense(data: IAddExpenseForm) {
  try {
    const collectionRef = collection(db, EFirebaseCollections.EXPENSES);
    await addDoc(collectionRef, data);
  } catch (error) {
    console.error("Error adding document:", error);
  }
}

export async function deleteExpense(id: string) {
  try {
    const docRef = doc(db, EFirebaseCollections.EXPENSES, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document:", error);
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

export async function getAllExpenses(
  userId: string,
  lastDoc?: QueryDocumentSnapshot | null
): Promise<IExpense[]> {
  try {
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
    
    const querySnapshot = await getDocs(expensesQuery);

    if (!querySnapshot.empty) {
      const expenses = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const dateDisplay = format(data.date.toDate(), "dd MMM yy");
        return {
          ...data,
          id: doc.id,
          date: dateDisplay,
        } as IExpense;
      });
      
      // Get the last document to use for pagination
      // const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

      // return {
      //   expenses: expenses as IExpense[],
      //   lastVisible, // Pass this to the next request for pagination
      // };

      return expenses 
    } else {
      console.log("No documents found in the collection.");
      return []
    }
  } catch (error) {
    console.error("Error fetching collection data:", error);
  return []
  }
}


export async function getAllExpenses0(): Promise<IExpense[]> {
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
