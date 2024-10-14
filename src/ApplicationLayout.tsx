import { Outlet } from "react-router-dom";
import { Menu } from "./Menu";
import { AddModal } from "./add/AddModal";

export default function ApplicationLayout() {
  return (
    <div className="flex flex-col min-h-screen gap-4">
      <Outlet />
      <AddModal />
      <div className="mt-auto">
        <Menu />
      </div>
    </div>
  );
}
