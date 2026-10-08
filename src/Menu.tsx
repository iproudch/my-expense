import {
  IoHome,
  IoPerson,
  IoPodium,
  IoTime,
  IoAdd,
} from "react-icons/io5";
import useModal from "./hooks/useModal";
import MenuItem from "./MenuItem";

export function Menu() {
  const { openModal: add } = useModal();
  return (
    <nav className="border-t border-[#26282f] bg-[#151618] px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <ul className="flex items-center">
        <MenuItem icon={<IoHome size={24} />} label="Home" path="/home" />
        <MenuItem icon={<IoTime size={24} />} label="History" path="/history" />
        <li className="flex flex-1 justify-center">
          <button
            type="button"
            onClick={add}
            aria-label="Add expense"
            className="-mt-4 flex h-16 w-16 items-center justify-center rounded-2xl border-0 bg-[#7b78ff] p-0 text-[#14141c] shadow-[0_8px_24px_rgba(123,120,255,0.45)] active:scale-95"
          >
            <IoAdd size={34} />
          </button>
        </li>
        <MenuItem icon={<IoPodium size={24} />} label="Analytics" path="/analytic" />
        <MenuItem icon={<IoPerson size={24} />} label="Account" path="/account" />
      </ul>
    </nav>
  );
}
