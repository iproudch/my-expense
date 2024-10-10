import { IoAddCircleSharp } from "react-icons/io5";
import useModal from "./hooks/useModal";

type MenuProps = {
  add?: () => void;
};
export function Menu(props: MenuProps) {
  // const { add } = props;
  const { openModal: add } = useModal();
  return (
    <ul className="menu menu-horizontal bg-base-100 rounded-box w-full flex justify-center">
      <li>
        <div
          onClick={() => {
            add();
          }}
        >
          <a>
            <IoAddCircleSharp size={48} />
          </a>
        </div>
      </li>
    </ul>
  );
}
