import { useState } from "react";
import Header from "../Header";
import { FaUserEdit } from "react-icons/fa";
import { useAuth } from "../context/UserProvider";

export function UserOverviews() {
  const [edit, setEdit] = useState<boolean>(false);
  const { user, logout } = useAuth();

  return (
    <div className=" flex flex-col w-96 gap-4">
      <Header title="Profile" />

      <div className="card bg-neutral text-neutral-content w-96 shadow-xl">
        <div className="card-body p-4 justify-center items-center">
          <div className="w-[80px] h-[80px] flex items-center bg-primary rounded-full ">
            <p className="text-center font-semibold text-3xl">P</p>
          </div>
        </div>
        <div className="card-body gap-2">
          <div className="flex justify-between">
            <span>Display Name</span>{" "}
            <div className="flex flex-row gap-2 items-center">
              {edit ? (
                <input
                  type="text"
                  className="input input-bordered  w-[140px] h-[24px]"
                />
              ) : (
                <span>John Doe</span>
              )}
              <FaUserEdit size={18} onClick={() => setEdit(!edit)} />
            </div>
          </div>
          <div className="flex justify-between">
            <span>Email</span> <span>{user?.email}</span>
          </div>
        </div>

        <div className="card-actions flex flex-row justify-between p-4">
          <button className="btn btn-primary w-full">Edit Profile</button>
          <button className="btn btn w-full" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
