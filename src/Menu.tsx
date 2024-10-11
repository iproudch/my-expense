import {
  IoAddCircleSharp,
  IoFolderSharp,
  IoHomeSharp,
  IoPersonSharp,
  IoPodiumSharp,
} from "react-icons/io5";
import useModal from "./hooks/useModal";

export function Menu() {
  const { openModal: add } = useModal();
  return (
    <ul className="menu menu-horizontal bg-base-100 rounded-box w-full flex justify-center items-center">
      <li className="flex-1">
        <a className="flex items-center justify-center">
          <IoHomeSharp size={22} />
        </a>
      </li>

      <li className="flex-1">
        <a className="flex items-center justify-center">
          <IoFolderSharp size={22} />
        </a>
      </li>

      <li className="flex-1">
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
      <li className="flex-1">
        <a className="flex items-center justify-center">
          <IoPodiumSharp size={22} />
        </a>
      </li>
      <li className="flex-1">
        <a className="flex items-center justify-center">
          <IoPersonSharp size={22} />
        </a>
      </li>
    </ul>
  );
}
