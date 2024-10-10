import { ExpenseIcon } from "./ExpenseIcon";
import { EFirebaseCollections, getExpenses } from "../service/service";
import { useQuery } from "@tanstack/react-query";
import { timestampToDate } from "../utils/range";
import { query, collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { IExpense } from "../interface/expenses";
import { db } from "../service/firebase.config";
import { Loader } from "../Loader";

export default function Expenses() {
  // const { data: expenses, isLoading } = useQuery({
  //   queryKey: ["expenses"],
  //   queryFn: getExpenses,
  // });

  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, EFirebaseCollections.EXPENSES)); // Firestore query
    // Set up the Firestore listener to listen for real-time updates
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const expensesData = await getExpenses(snapshot);
      setExpenses(expensesData);
      setIsLoading(false);
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  return (
    <>
      <h2 className="font-semibold">Expenses</h2>
      {isLoading ? <Loader /> : null}
      {expenses?.map((item) => (
        <div
          key={item.id}
          className="card bg-neutral text-neutral-content w-96"
        >
          <div className="card-body flex flex-row p-4 justify-between">
            <div className="flex gap-2 items-center">
              <ExpenseIcon category={item.category} />
              <div className="flex flex-col">
                <p className="font-semibold">{item.category}</p>
                <p className="text-sm">{item.description}</p>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="font-bold">{item.amount} ฿</span>
              {item.date}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
