import { useState } from "react";
import { CURRENCY } from "../constants";
import { useAuth } from "../context/UserProvider";
import { addUpdateMonthlyPayment } from "../service/analysis";

type SharedSplitProps = {
  sharedTotal: number;
  month: number; // 0-based
  year: number;
  isPaid: boolean;
  className?: string;
};

const PRESETS = [50, 60, 70];

export default function SharedSplit({
  sharedTotal,
  month,
  year,
  isPaid,
  className,
}: SharedSplitProps) {
  const { userId } = useAuth();
  const [percentage, setPercentage] = useState(50);
  const [custom, setCustom] = useState(false);

  const markAsPaid = async () => {
    await addUpdateMonthlyPayment({ userId, month: month + 1, year, isPaid: true });
  };

  const yourShare = (sharedTotal * percentage) / 100;
  const partnerPays = sharedTotal - yourShare;
  const format = (value: number) =>
    value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  const tabClass = (active: boolean) =>
    `flex-1 rounded-xl py-3 text-lg font-semibold ${
      active ? "bg-[#2d3340] text-white" : "bg-transparent text-[#8f8bff]"
    }`;

  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Shared split</h2>
        <span
          className={`flex items-center gap-2 rounded-full px-4 py-1.5 font-medium ${
            isPaid
              ? "bg-[#27402f] text-[#6fd6a0]"
              : "bg-[#43282d] text-[#f48c8c]"
          }`}
        >
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              isPaid ? "bg-[#6fd6a0]" : "bg-[#f48c8c]"
            }`}
          />
          {isPaid ? "Paid" : "Not paid"}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between text-lg">
        <span className="text-[#a0a4b3]">Shared expenses</span>
        <span className="font-bold text-white">
          {sharedTotal.toLocaleString()} {CURRENCY}
        </span>
      </div>

      <p className="mt-5 text-lg text-[#a0a4b3]">Your share</p>
      <div className="mt-2 flex items-center gap-1 rounded-2xl bg-[#1b1d24] p-1.5">
        {PRESETS.map((value) => (
          <button
            key={value}
            type="button"
            className={tabClass(!custom && percentage === value)}
            onClick={() => {
              setCustom(false);
              setPercentage(value);
            }}
          >
            {value}%
          </button>
        ))}
        <button
          type="button"
          className={tabClass(custom)}
          onClick={() => setCustom(true)}
        >
          Custom
        </button>
      </div>
      {custom ? (
        <div className="mt-3 flex items-center gap-3 rounded-2xl border border-[#2f323b] bg-[#1b1d24] px-5 py-4">
          <input
            type="number"
            min={0}
            max={100}
            value={percentage}
            onChange={(e) =>
              setPercentage(Math.min(100, Math.max(0, Number(e.target.value))))
            }
            className="w-full bg-transparent text-xl text-white outline-none"
            aria-label="Custom percentage"
          />
          <span className="text-xl text-[#d5d7e0]">%</span>
        </div>
      ) : null}

      <div className="mt-4 rounded-2xl bg-[#1b1d24] px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg text-[#d5d7e0]">Partner pays</p>
            <p className="text-[#6f7380]">{100 - percentage}%</p>
          </div>
          <p className="text-4xl font-bold text-[#a5a0f9]">
            {format(partnerPays)} {CURRENCY}
          </p>
        </div>
        <div className="my-4 h-px bg-[#34373f]" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg text-[#a0a4b3]">Your share</p>
            <p className="text-[#6f7380]">{percentage}%</p>
          </div>
          <p className="text-2xl font-bold text-[#a0a4b3]">
            {format(yourShare)} {CURRENCY}
          </p>
        </div>
      </div>

      {!isPaid ? (
        <button
          type="button"
          onClick={() => void markAsPaid()}
          className="mt-4 w-full rounded-2xl border-0 bg-[#7b78ff] py-4 text-lg font-semibold text-[#14141c]"
        >
          Mark as paid
        </button>
      ) : null}
    </div>
  );
}
