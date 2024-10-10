import { useMemo } from "react";
import { IoCart, IoFastFoodSharp, IoStorefrontSharp } from "react-icons/io5";
type ExpenseIconProps = {
  category: string;
};
export function ExpenseIcon(props: ExpenseIconProps) {
  const { category } = props;

  const icon = useMemo(() => {
    switch (category) {
      case "Food":
        return <IoFastFoodSharp size={20} />;
      case "Drink":
        return "🍸";
      case "Shopping":
        return <IoCart size={20} />;
      default:
        return <IoStorefrontSharp size={20} />;
    }
  }, [category]);

  return (
    <div className="w-[45px] h-[45px] flex justify-center items-center rounded-full bg-base-200">
      {icon}
    </div>
  );
}
