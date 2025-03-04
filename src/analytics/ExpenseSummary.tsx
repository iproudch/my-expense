import { useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { CURRENCY } from "../constants";

type ExpenseSummaryProps = {
  total?: number;
};
export default function ExpenseSummary(props: ExpenseSummaryProps) {
  const { total } = props;
  const [percentage, setPercentage] = useState<number | undefined>(50);
  const [custom, setCustom] = useState<boolean>(false);

  const onChangePercentage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPercentage(value >= 0 && value <= 100 ? value : undefined);
  };

  const totalPerPerson = total && percentage ? (total * percentage) / 100 : 0;
  return (
    <div className="card-body bg-gray-600 rounded-lg px-4 py-2 text-white">
      <div className="flex flex-col">
        <span className="flex flex-row justify-between items-center">
          <span className="flex flex-row items-center gap-1 text-xs ">
            <IoPersonOutline className="text-primary text-sm" /> Per Person:
          </span>
          <span className="font-semibold">
            {totalPerPerson.toFixed(2)} {CURRENCY}
          </span>
        </span>
        <i className="text-xs text-gray-400">
          Calculated based on {percentage}%
        </i>
      </div>
      <div className="flex flex-row gap-2 text-xs">
        <input
          type="checkbox"
          className="checkbox checkbox-xs"
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
    </div>
  );
}
