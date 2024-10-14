import { IoIosMore } from "react-icons/io";
import { CURRENCY } from "../constanst";
import { IExpense } from "../interface/expenses";
import { Loader } from "../Loader";
import { ExpenseIcon } from "./ExpenseIcon";
import { useState } from "react";
import { deleteExpense } from "../service/service";

type ExpenseListProps = {
  expenses: IExpense[];
  showOptions?: boolean;
};

export function ExpenseList(props: ExpenseListProps) {
  const { expenses, showOptions } = props;
  const [activeItem, setActiveItem] = useState<string | undefined>(undefined);
  const [dismiss, setDismiss] = useState(false);

  return expenses.length > 0 ? (
    expenses.map((item) => (
      <div
        tabIndex={0}
        key={item.id}
        className="card bg-neutral text-neutral-content w-96 relative"
        onClick={() => setDismiss(!dismiss)}
      >
        <div className="card-body flex flex-row p-4 justify-between">
          <div className="flex gap-2 items-center">
            <ExpenseIcon category={item.category} />
            <div className="flex flex-col">
              <p className="font-semibold">{item.category}</p>
              <p className="text-sm">{item.description}</p>
            </div>
          </div>

          <div className="flex flex-col items-end relative">
            {showOptions ? (
              <IoIosMore tabIndex={1} onClick={() => setActiveItem(item.id)} />
            ) : null}

            {showOptions && activeItem === item.id && !dismiss ? (
              <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow absolute top-5 right-0">
                <li>
                  <span onClick={() => deleteExpense(item.id)}>
                    <a>Delete</a>
                  </span>
                </li>
              </ul>
            ) : null}

            <span className="font-bold">
              {item.amount} {CURRENCY}
            </span>
            {item.date}
          </div>
        </div>
      </div>
    ))
  ) : (
    <Loader />
  );
}
