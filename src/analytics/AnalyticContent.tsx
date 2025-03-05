import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import Card from "../Card";
import { CURRENCY, Months, YEARS } from "../constants";
import { useAuth } from "../context/UserProvider";
import { getTotalMonthlyExpenses } from "../service/analysis";
import ExpenseSummary from "./ExpenseSummary";

export function AnalyticsContent() {
  const [selectedMonth, setSelectedMonth] = useState<number | undefined>(
    undefined
  );
  const [year, setYear] = useState(YEARS[YEARS.length - 1]);
  const [summary, setSummary] = useState<number | undefined>(undefined);
  const [includeSharing, setIncludeSharing] = useState<boolean>(true);
  const { userId } = useAuth();

  const onChangeFilter = async (month: number, year: number) => {
    setSummary(undefined);
    setSelectedMonth(month);
    setYear(year);
  };

  const onSearch = async () => {
    if (!userId || !year || selectedMonth === undefined) return;
    const expenses = await getTotalMonthlyExpenses(
      userId,
      includeSharing,
      selectedMonth + 1,
      year
    );
    setSummary(expenses);
  };

  const prevYear = () => {
    if (year === 2024) return;
    setYear(year - 1);
  };

  const nextYear = () => {
    if (year === 2025) return;
    setYear(year + 1);
  };

  return (
    <>
      <div className="flex items-center justify-items-center flex-row gap-4">
        <Card>
          <div className="flex flex-row justify-between font-semibold px-4 py-0">
            <span
              className="font-semibold text-primary cursor-pointer"
              onClick={prevYear}
            >
              {"<"}
            </span>
            {year}
            <span
              className="font-semibold text-primary cursor-pointer"
              onClick={nextYear}
            >
              {">"}
            </span>
          </div>
          <div className="grid grid-cols-6 ">
            {Months.map((month, index) => (
              <div
                key={month}
                className={`flex justify-center text-sm gap-1 cursor-pointer w-10 hover:bg-neutral hover:text-primary ${
                  index === selectedMonth ? "bg-primary text-white rounded" : ""
                }`}
                onClick={() => onChangeFilter(index, year)}
              >
                {month}
              </div>
            ))}
          </div>
          <hr className="border-gray-600 mt-2 mb-2" />
          <div className="flex flex-row justify-between gap-4 text-sm items-center">
            <span className="flex flex-row gap-2 ">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-xs checkbox-primary"
                onChange={() => setIncludeSharing((check) => !check)}
              />
              include sharing expenses
            </span>
            <button
              className="btn btn-sm btn-primary text-white"
              onClick={() => void onSearch()}
            >
              <IoSearch />
              Search
            </button>
          </div>
        </Card>
      </div>

      <Card>
        {summary ? (
          <>
            <div className="flex flex-row gap-4 items-center">
              <h1 className="font-semibold text-primary">{summary}</h1>
              <span className="font-semibold text-4xl">{CURRENCY}</span>
            </div>
            <span className="text-xs">
              total expenses on {Months[selectedMonth ?? 0]} {year}
            </span>
          </>
        ) : !summary && selectedMonth !== 0 ? (
          <div className="flex flex-row gap-4">
            <span className="font-semibold">No expenses found</span>
          </div>
        ) : null}
        {summary && <ExpenseSummary total={summary} />}
      </Card>
    </>
  );
}
