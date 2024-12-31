import { useState } from "react";
import { getTotalMonthlyExpenses } from "../service/analysis";
import { useAuth } from "../context/UserProvider";
import { CURRENCY } from "../constants";

export function AnalyticsContent() {
  const [month, setMonth] = useState(0);
  const [summary, setSummary] = useState<number | undefined>(undefined);
  const [includeSharing, setIncludeSharing] = useState<boolean>(true);
  const { userId } = useAuth();

  const onChangeFilter = async (month: number, sharing?: boolean) => {
    setMonth(month);
    setIncludeSharing(sharing || includeSharing);
    const expenses = await getTotalMonthlyExpenses(
      userId as string,
      includeSharing,
      month,
      2024
    );
    setSummary(expenses);
  };
  return (
    <>
      <div className="flex items-center justify-items-center flex-row gap-4">
        {/* <Card title={"Expense"} /> */}
        {/* <Card title={"Expense"} /> */}
        <select
          className="select select-bordered w-full max-w-xs"
          value={month}
          // onChange={(e) => setMonth(parseInt(e.target.value))}
          onChange={(e) => onChangeFilter(parseInt(e.target.value))}
        >
          <option value={0} disabled>
            Select month
          </option>
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>
      </div>
      <div className="flex flex-row gap-4">
        <input
          type="checkbox"
          className="checkbox"
          defaultChecked
          onChange={(e) => onChangeFilter(month, e.target.checked)}
        />{" "}
        include sharing expenses
      </div>
      {summary ? (
        <div className="flex flex-row gap-4">
          <h1 className="font-semibold">
            {summary} {CURRENCY}
          </h1>
        </div>
      ) : !summary && month !== 0 ? (
        <div className="flex flex-row gap-4">
          <span className="font-semibold">No expenses found</span>
        </div>
      ) : null}
      {summary && <ExpenseSummary total={summary} />}
    </>
  );
}

type ExpenseSummaryProps = {
  total?: number;
};
function ExpenseSummary(props: ExpenseSummaryProps) {
  const { total } = props;
  const [percentage, setPercentage] = useState<number | undefined>(50);
  const [custom, setCustom] = useState<boolean>(false);

  const onChangePercentage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPercentage(value >= 0 && value <= 100 ? value : undefined);
  };

  const totalPerPerson = total && percentage ? (total * percentage) / 100 : 0;
  return (
    <>
      <div className="flex flex-col">
        <span>
          Total for each person:{" "}
          <span className="font-semibold">
            {totalPerPerson.toFixed(2)} {CURRENCY}
          </span>
        </span>
        <i className="text-xs">Calculated based on {percentage}%</i>
      </div>
      <div className="flex flex-row gap-4">
        <input
          type="checkbox"
          className="checkbox"
          onChange={(e) => setCustom(e.target.checked)}
        />{" "}
        Custom Percentage
        {custom ? (
          <input
            type="number"
            min={0}
            max={100}
            value={percentage}
            onChange={onChangePercentage}
          />
        ) : null}
      </div>
    </>
  );
}

type CardProps = {
  title: string;
};
function Card(props: CardProps) {
  const { title } = props;
  return (
    <div className="card bg-neutral text-neutral-content w-96">
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>We are using cookies for no reason.</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Accept</button>
        </div>
      </div>
    </div>
  );
}
