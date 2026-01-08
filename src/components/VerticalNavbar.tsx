import { LogOut } from "lucide-react";
import { navConfig } from "../config/navConfig";
import { getUserRole } from "../utils/getUserRole";
import logo from "../assets/logo.png";


export default function VerticalNavbar() {
  const role = getUserRole();
  const navItems = navConfig[role];

  return (
    <aside
      className="
        h-screen w-16 group-hover:w-64
        bg-black/60 backdrop-blur-xl
        border-r border-indigo-700/20
        transition-all duration-300
        flex flex-col
      "
    >
      {/* LOGO */}
      <div className="h-16 flex items-center justify-start border-b border-indigo-700/20">
     <div className="flex items-center gap-1">
    <img
      src={logo}
      alt="FastFare"
      width={40}
      height={40}
      className="object-contain rounded-md p-1"
    />

    {/* Brand name */}
    <span className="text-indigo-400 font-bold text-lg">
      <span className="hidden group-hover:inline">FastFare</span>
      <span className="group-hover:hidden">FF</span>
    </span>
  </div>
</div>


      {/* NAV ITEMS */}
      <nav className="flex-1 flex flex-col gap-2 p-2 mt-4">
        {navItems.map(({ label, icon: Icon, href }) => (
          <a
            key={href}
            href={href}
            className="
              flex items-center gap-4
              px-3 py-2 rounded-xl
              text-slate-300 hover:text-white
              hover:bg-indigo-700/20
              transition-all
            "
          >
            <Icon size={22} />
            <span className="hidden group-hover:inline text-sm font-medium">
              {label}
            </span>
          </a>
        ))}
      </nav>

      {/* LOGOUT (not for guest) */}
      {role !== "guest" && (
        <div className="p-2 border-t border-indigo-700/20">
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="
              flex items-center gap-4 w-full
              px-3 py-2 rounded-xl
              text-red-400 hover:text-red-300
              hover:bg-red-500/10
              transition-all
            "
          >
            <LogOut size={22} />
            <span className="hidden group-hover:inline text-sm font-medium">
              Logout
            </span>
          </button>
        </div>
      )}
    </aside>
  );
}
