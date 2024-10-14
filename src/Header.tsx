type HeaderProps = {
  title: string;
  icon?: React.ReactNode;
};
export default function Header(props: HeaderProps) {
  const { title, icon } = props;
  return (
    <div className="flex justify-between items-center">
      <h1>{title}</h1> {icon ? icon : <></>}
    </div>
  );
}
