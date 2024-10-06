import { ExpenseIcon } from "./ExpenseIcon";

const MOCK_DATA = [
  {
    id: 1,
    amount: 20,
    category: "Food",
    date: "2024-01-01",
    description: "KFC",
  },
  {
    id: 2,
    amount: 90,
    category: "Food",
    date: "2024-01-07",
    description: "Momo",
  },
  {
    id: 3,
    amount: 40,
    category: "Other",
    date: "2024-01-08",
    description: "7-eleven",
  },
];
export default function Expenses() {
  return (
    <>
      <h2 className="font-semibold">Expenses</h2>
      {MOCK_DATA.map((item) => (
        <div
          key={item.id}
          className="card bg-neutral text-neutral-content w-96"
        >
          <div className="card-body flex flex-row p-4 justify-between">
            <div className="flex gap-2 items-center">
              <ExpenseIcon category={item.category} />
              <div className="flex flex-col">
                <p className="font-semibold">{item.category}</p>
                <p className="text-sm">{item.description}</p>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="font-bold">{item.amount} ฿</span>
              <p>{item.date}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
