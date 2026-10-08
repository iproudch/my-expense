import { format } from "date-fns";
import { CURRENCY } from "../constants";
import { useAuth } from "../context/UserProvider";
import { useMonthSummary } from "../hooks/useMonthSummary";
import { getCategoryStyle } from "../utils/category";

export default function Summary() {
  const { userId } = useAuth();
  const { total, previousTotal, categories } = useMonthSummary(userId);

  const now = new Date();
  const previousMonth = format(
    new Date(now.getFullYear(), now.getMonth() - 1, 1),
    "MMM"
  );
  const delta = total - previousTotal;

  return (
    <div className="w-full rounded-3xl bg-[#23262f] p-6 text-[#e9eaf0]">
      <div className="flex items-center justify-between">
        <h2 className="text-lg text-[#b7bac6]">
          Spent in {format(now, "MMMM")}
        </h2>
        <span
          className={`rounded-full bg-[#2d3039] px-3 py-1 text-sm font-medium ${
            delta > 0 ? "text-[#f48c8c]" : "text-[#6fd6a0]"
          }`}
        >
          {delta > 0 ? "+" : "−"}
          {Math.abs(delta).toLocaleString()} {CURRENCY} vs {previousMonth}
        </span>
      </div>

      <p className="mt-4 text-5xl font-bold">
        {total.toLocaleString()} {CURRENCY}
      </p>

      {total > 0 ? (
        <>
          <div className="mt-5 flex h-3 gap-0.5 overflow-hidden rounded-full">
            {categories.map(({ category, total: value }) => (
              <div
                key={category}
                style={{
                  flexGrow: value,
                  backgroundColor: getCategoryStyle(category).color,
                }}
              />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[#b7bac6]">
            {categories.map(({ category, total: value }) => (
              <span key={category} className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: getCategoryStyle(category).color }}
                />
                {category} · {value.toLocaleString()} {CURRENCY}
              </span>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
