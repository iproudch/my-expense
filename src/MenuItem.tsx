import { NavLink } from "react-router-dom";

type MenuItemProps = {
  icon: React.ReactNode;
  label: string;
  path: string;
};

export default function MenuItem({ icon, label, path }: MenuItemProps) {
  return (
    <li className="flex-1">
      <NavLink
        to={path}
        className={({ isActive }) =>
          `flex flex-col items-center justify-center gap-1 py-3 text-sm font-semibold transition-colors ${
            isActive ? "text-[#a5a0f9]" : "text-white"
          }`
        }
      >
        {icon}
        <span>{label}</span>
      </NavLink>
    </li>
  );
}
