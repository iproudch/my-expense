import { CURRENCY } from "../constanst";
import { IExpense } from "../interface/expenses";
import { ExpenseIcon } from "./ExpenseIcon";

type ExpenseListProps = {
  expenses: IExpense[];
};

export function ExpenseList(props: ExpenseListProps) {
  const { expenses } = props;
  return expenses.map((item) => (
    <div key={item.id} className="card bg-neutral text-neutral-content w-96">
      <div className="card-body flex flex-row p-4 justify-between">
        <div className="flex gap-2 items-center">
          <ExpenseIcon category={item.category} />
          <div className="flex flex-col">
            <p className="font-semibold">{item.category}</p>
            <p className="text-sm">{item.description}</p>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="font-bold">
            {item.amount} {CURRENCY}
          </span>
          {item.date}
        </div>
      </div>
    </div>
  ));
}
