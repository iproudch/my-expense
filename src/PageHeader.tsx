import { useAuth } from "./context/UserProvider";

type PageHeaderProps = {
  subtitle: string;
  title: string;
  showAvatar?: boolean;
};

export default function PageHeader({
  subtitle,
  title,
  showAvatar = true,
}: PageHeaderProps) {
  const { user } = useAuth();
  const initial = (user?.displayName ?? "").charAt(0).toUpperCase();
  return (
    <div className="flex items-center justify-between gap-4 px-2 pt-2">
      <div className="min-w-0">
        <p className="text-sm text-[#a0a4b3]">{subtitle}</p>
        <h1 className="truncate text-3xl font-bold leading-tight text-white">{title}</h1>
      </div>
      {showAvatar ? (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2b2d52] text-base font-semibold text-[#c9c6ff]">
        {initial}
      </div>
      ) : null}
    </div>
  );
}
