import { useEffect, useState } from "react";
import { subscribeToTotalExpensesForMonth } from "../service/analysis";
import { CURRENCY } from "../constanst";
import { useAuth } from "../context/UserProvider";

export default function Summary() {
  const { userId } = useAuth();
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const unsubscribe = subscribeToTotalExpensesForMonth(userId, (total) => {
      setTotalExpenses(total);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  return (
    <div className="card bg-neutral w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Spending</h2>
        <p>you have spending this month</p>
        <h1 className="font-bold">
          {totalExpenses} {CURRENCY}
        </h1>
      </div>
    </div>
  );
}
