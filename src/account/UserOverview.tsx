import { useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { useAuth } from "../context/UserProvider";
import PageHeader from "../PageHeader";
import { updateUserByUserId } from "../service/user";

const cardClass = "w-full rounded-3xl bg-[#23262f] p-5 text-[#e9eaf0]";

export function UserOverviews() {
  const { user, logout, userId } = useAuth();
  const [edit, setEdit] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const initial = (user?.displayName ?? "").charAt(0).toUpperCase();

  const startEdit = () => {
    setDisplayName(user?.displayName ?? "");
    setEdit(true);
  };

  const save = async () => {
    if (!userId || !displayName.trim()) return;
    await updateUserByUserId(userId, { ...user, displayName: displayName.trim() });
    setEdit(false);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <PageHeader
        subtitle="Manage your profile"
        title="Account"
        showAvatar={false}
      />

      <div className={cardClass}>
        <div className="flex justify-center py-3">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#2b2d52] text-4xl font-bold text-[#c9c6ff]">
            {initial}
          </div>
        </div>

        <div className="mt-3">
          <p className="text-sm text-[#a0a4b3]">Display name</p>
          {edit ? (
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              autoFocus
              className="mt-1 w-full rounded-2xl border border-[#7b78ff] bg-[#1b1c20] px-4 py-3 text-lg text-white outline-none"
            />
          ) : (
            <p className="mt-1 text-lg text-white">{user?.displayName}</p>
          )}
        </div>

        <div className="my-4 h-px bg-[#34373f]" />

        <div>
          <p className="text-sm text-[#a0a4b3]">Email</p>
          <p className="mt-1 text-lg text-white">{user?.email}</p>
        </div>

        {edit ? (
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setEdit(false)}
              className="rounded-2xl border border-[#34365a] bg-transparent py-3.5 text-lg font-semibold text-[#a5a0f9]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void save()}
              className="rounded-2xl border-0 bg-[#7b78ff] py-3.5 text-lg font-semibold text-[#14141c]"
            >
              Save
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={startEdit}
            className="mt-5 w-full rounded-2xl border-0 bg-[#7b78ff] py-3.5 text-lg font-semibold text-[#14141c]"
          >
            Edit profile
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={() => void logout()}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#4a2e33] bg-[#2a1f22] py-4 text-lg font-semibold text-[#f48c8c]"
      >
        <IoLogOutOutline size={22} />
        Log out
      </button>
    </div>
  );
}
