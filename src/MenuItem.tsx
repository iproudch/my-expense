import { Link } from "react-router-dom";

type MenuItemProps = {
  icon: React.ReactNode;
  label?: string;
  path?: string;
};
export default function MenuItem(props: MenuItemProps) {
  const { icon, label, path } = props;
  return (
    <li className="flex-1">
      <Link
        to={path ?? "#"}
        className="flex flex-col items-center justify-center gap-1 p-0"
      >
        {icon}
        {label ? <p>{label}</p> : null}
      </Link>
    </li>
  );
}
