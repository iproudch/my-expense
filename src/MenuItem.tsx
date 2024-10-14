type MenuItemProps = {
  icon: React.ReactNode;
  label?: string;
  path?: string;
};
export default function MenuItem(props: MenuItemProps) {
  const { icon, label, path } = props;
  return (
    <li className="flex-1">
      <a
        className="flex flex-col items-center justify-center gap-1 p-0"
        href={path}
      >
        {icon}
        {label ? <p>{label}</p> : null}
      </a>
    </li>
  );
}
