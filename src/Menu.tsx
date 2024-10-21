import {
  IoAddCircleSharp,
  IoHomeSharp,
  IoPersonSharp,
  IoPodiumSharp,
  IoTime,
} from "react-icons/io5";
import useModal from "./hooks/useModal";
import MenuItem from "./MenuItem";

export function Menu() {
  const { openModal: add } = useModal();
  return (
    <ul className="menu menu-horizontal bg-base-100 rounded-box w-full flex justify-center items-center">
      <MenuItem icon={<IoHomeSharp size={22} />} label="Home" path="/home" />
      <MenuItem icon={<IoTime size={22} />} label="History" path="/history" />

      <li className="flex-1">
        <div
          className="absolute bottom-[-28px]"
          onClick={() => {
            add();
          }}
        >
          <a>
            <IoAddCircleSharp size={48} />
          </a>
        </div>
      </li>
      <MenuItem icon={<IoPodiumSharp size={22} />} label="Analytics" />
      <MenuItem
        icon={<IoPersonSharp size={22} />}
        label="Account"
        path="/account"
      />
    </ul>
  );
}
