import { House, Bell, CircleUserRound, Settings, LogOut } from "lucide-react";
import { NavLink } from "react-router";
import { useContext } from "react";
import { userContext } from "../../context/UserContext";
export default function Sidebar() {
  const { userInfo, setUserInfo, token, setToken } = useContext(userContext);
  function logout() {
    setUserInfo(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
  }
  return (
    <>
      <aside className="bg-gray-100 shadow-xl min-w-64 top-0 bottom-0 left-0 fixed p-5">
        <div>
          <ul className="space-y-4 mt-1">
            <li>
              <NavLink
                to={`/`}
                className={({ isActive }) => {
                  return `flex items-center font-medium gap-2 px-2 py-1 rounded-md ${isActive ? `bg-purple-900 text-white` : ` hover:bg-gray-200 transition-colors duration-200`}`;
                }}
              >
                <House />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/notifications`}
                className={({ isActive }) => {
                  return `flex items-center font-medium gap-2 px-2 py-1 rounded-md ${isActive ? `bg-purple-900 text-white` : ` hover:bg-gray-200 transition-colors duration-200`}`;
                }}
              >
                <Bell /> <span>Notifications</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/profile`}
                className={({ isActive }) => {
                  return `flex items-center font-medium gap-2 px-2 py-1 rounded-md ${isActive ? `bg-purple-900 text-white` : ` hover:bg-gray-200 transition-colors duration-200`}`;
                }}
              >
                <CircleUserRound /> <span>Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/setting`}
                className={({ isActive }) => {
                  return `flex items-center font-medium gap-2 px-2 py-1 rounded-md ${isActive ? `bg-purple-900 text-white` : ` hover:bg-gray-200 transition-colors duration-200`}`;
                }}
              >
                <Settings /> <span>Setting</span>
              </NavLink>
            </li>
          </ul>
          <div className="mt-87.5 bottom-0 right-0 left-0 flex items-center justify-between top-0 rounded-2xl border border-white/10 bg-white p-3 shadow-xl shadow-slate-950/10">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <img
                  src={
                    userInfo?.photo ||
                    "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
                  }
                  alt={userInfo?.name || "User"}
                  className="h-10 w-10 rounded-3xl object-cover ring-2 ring-cyan-300/60"
                />
                <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-[#26333e] bg-emerald-400" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">
                  {userInfo?.name || "User"}
                </p>
                <p className="truncate text-xs text-slate-400">
                  @{userInfo?.username || ""}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className=" w-fit gap-2 rounded-lg py-2 text-xs font-bold text-slate-600 transition-colors hover:text-red-700 "
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
