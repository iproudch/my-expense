import { Outlet } from "react-router-dom";
import { Menu } from "./Menu";
import { AddModal } from "./add/AddModal";

export default function ApplicationLayout() {
  return (
    <div className="flex flex-col h-screen h-dvh gap-4 w-full max-w-md mx-auto">
      <div className="flex flex-col flex-1 min-h-0 gap-4 overflow-y-auto">
        <Outlet />
      </div>
      <AddModal />
      <div className="shrink-0">
        <Menu />
      </div>
    </div>
  );
}
