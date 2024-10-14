import { Outlet } from "react-router-dom";
import { Menu } from "./Menu";

export default function ApplicationLayout() {
  return (
    <div className="flex flex-col min-h-screen gap-4">
      <Outlet />
      <div className="mt-auto">
        <Menu />
      </div>
    </div>
  );
}
