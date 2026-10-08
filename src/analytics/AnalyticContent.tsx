import { useMemo, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { CURRENCY, Months } from "../constants";
import { useAuth } from "../context/UserProvider";
import usePaidMonths from "../hooks/usePaidMonths";
import useYearExpenses from "../hooks/useYearExpenses";
import { getCategoryStyle } from "../utils/category";
import SharedSplit from "./SharedSplit";

const cardClass = "w-full rounded-3xl bg-[#23262f] p-5 text-[#e9eaf0]";
const arrowClass =
  "flex h-12 w-12 items-center justify-center rounded-xl bg-[#2d3039] text-[#a5a0f9] disabled:opacity-30";

export function AnalyticsContent() {
  const { userId } = useAuth();
  const now = new Date();
  const [year, setYear] = useState<number>(now.getFullYear());
  const [month, setMonth] = useState<number>(now.getMonth());
  const [isSharing, setIsSharing] = useState<boolean>(true);
  const yearExpenses = useYearExpenses(userId, year);
  const paidMonths = usePaidMonths(userId, year);

  const monthsToPay = useMemo(
    () =>
      new Set(
        yearExpenses
          .filter((e) => e.sharing && !paidMonths.has(e.month))
          .map((e) => e.month)
      ),
    [yearExpenses, paidMonths]
  );

  const monthExpenses = useMemo(
    () => yearExpenses.filter((e) => e.month === month),
    [yearExpenses, month]
  );

  const { total, categories } = useMemo(() => {
    const byCategory = new Map<string, number>();
    let sum = 0;
    monthExpenses
      .filter((e) => isSharing || !e.sharing)
      .forEach((e) => {
        sum += e.amount;
        byCategory.set(e.category, (byCategory.get(e.category) ?? 0) + e.amount);
      });
    return {
      total: sum,
      categories: [...byCategory.entries()].sort((a, b) => b[1] - a[1]),
    };
  }, [monthExpenses, isSharing]);

  const sharedTotal = monthExpenses
    .filter((e) => e.sharing)
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <>
      <div className={cardClass}>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className={arrowClass}
            onClick={() => setYear(year - 1)}
            aria-label="Previous year"
          >
            <IoChevronBack />
          </button>
          <span className="text-xl font-bold text-white">{year}</span>
          <button
            type="button"
            className={arrowClass}
            disabled={year >= now.getFullYear()}
            onClick={() => setYear(year + 1)}
            aria-label="Next year"
          >
            <IoChevronForward />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-y-3">
          {Months.map((name, index) => (
            <button
              key={name}
              type="button"
              onClick={() => setMonth(index)}
              className={`flex flex-col items-center rounded-xl py-3 text-lg font-semibold ${
                index === month
                  ? "bg-[#7b78ff] text-[#14141c]"
                  : "bg-transparent text-[#a5a0f9]"
              }`}
            >
              {name}
              <span
                className={`mt-1 h-1.5 w-1.5 rounded-full ${
                  monthsToPay.has(index)
                    ? index === month
                      ? "bg-[#14141c]"
                      : "bg-[#7b78ff]"
                    : "bg-transparent"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="my-3 h-px bg-[#34373f]" />
        <label className="flex items-center justify-between text-lg">
          Include shared expenses
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={isSharing}
            onChange={(e) => setIsSharing(e.target.checked)}
          />
        </label>
      </div>

      <div className={cardClass}>
        <p className="text-5xl font-bold text-[#a5a0f9]">
          {total.toLocaleString()} {CURRENCY}
        </p>
        <p className="mt-1 text-[#a0a4b3]">
          Total expenses in {Months[month]} {year}
        </p>
        <ul className="mt-5 flex flex-col gap-5">
          {categories.map(([category, value]) => {
            const { color, icon } = getCategoryStyle(category);
            const percent = Math.round((value / total) * 100);
            return (
              <li key={category}>
                <div className="flex items-center gap-3">
                  <span style={{ color }}>{icon}</span>
                  <span className="flex-1 text-lg">{category}</span>
                  <span className="text-[#a0a4b3]">{percent}%</span>
                  <span className="w-20 text-right font-bold text-white">
                    {value.toLocaleString()} {CURRENCY}
                  </span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-[#2d3039]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${percent}%`, backgroundColor: color }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <SharedSplit
        sharedTotal={sharedTotal}
        month={month}
        year={year}
        isPaid={paidMonths.has(month)}
        className={cardClass}
      />
    </>
  );
}
