type HeaderProps = {
  title: string;
  desc?: string;
  icon?: React.ReactNode;
};
export default function Header(props: HeaderProps) {
  const { title, icon, desc } = props;
  return (
    <div className="flex justify-between items-center">
      <h1>{title}</h1> {desc ? <p>{desc}</p> : null} {icon ? icon : <></>}
    </div>
  );
}
