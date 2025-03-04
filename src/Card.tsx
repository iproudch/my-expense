interface CardProps {
  children: React.ReactNode;
}
export default function Card(props: CardProps) {
  const { children } = props;
  return (
    <div className="card bg-neutral text-neutral-content w-96">
      <div className="card-body p-6">{children}</div>
    </div>
  );
}
