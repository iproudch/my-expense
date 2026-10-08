import { IoEllipsisHorizontal } from "react-icons/io5";
import { CURRENCY } from "../constants";
import { IExpense } from "../interface/expenses";
import { getCategoryStyle } from "../utils/category";

type ExpenseRowProps = {
  item: IExpense;
  onDelete?: (id: string) => void;
};

export function ExpenseRow({ item, onDelete }: ExpenseRowProps) {
  const { color, tint, icon } = getCategoryStyle(item.category);
  return (
    <li className="flex items-center gap-4 py-3">
      <div
        className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-2xl"
        style={{ backgroundColor: tint, color }}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-lg font-semibold text-white">
            {item.description || item.category}
          </p>
          {item.sharing ? (
            <span className="rounded-md bg-[#34345c] px-2 py-0.5 text-xs font-semibold text-[#a5a0f9]">
              Shared
            </span>
          ) : null}
        </div>
        <p className="text-[#8d91a0]">
          {item.description ? `${item.category} · ${item.date}` : item.date}
        </p>
      </div>
      <span className="text-lg font-bold text-white">
        {item.amount.toLocaleString()} {CURRENCY}
      </span>
      {onDelete ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="p-1 text-[#8f8bff]"
            aria-label="More options"
          >
            <IoEllipsisHorizontal size={22} />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu z-[1] w-36 rounded-box bg-[#2d3039] p-2 shadow"
          >
            <li>
              <a onClick={() => onDelete(item.id)}>Delete</a>
            </li>
          </ul>
        </div>
      ) : null}
    </li>
  );
}
