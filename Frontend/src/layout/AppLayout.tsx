import { NavLink, Outlet } from "react-router";

const AppLayout = () => {
  return (
    <div className="w-screen h-screen flex font-sans bg-gradient-to-tr from-gray-100 via-white to-gray-200">
      {/* Sidebar */}
      <aside className="w-[25%] h-full bg-gradient-to-b from-indigo-700 to-purple-600 text-white shadow-2xl flex flex-col">
        {/* Title and Logo */}
        <div className="p-6 border-b border-white/20">
          <h1 className="text-3xl font-extrabold tracking-wide">📘 LMS APP</h1>
        </div>

        {/* Menu Items */}
        <nav className="p-6 flex-1">
          <ul className="space-y-3 text-lg">
            <li>
              <NavLink
                to="/books"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-white/20 text-white font-semibold"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                📚 Books
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/members"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-white/20 text-white font-semibold"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                👥 Members
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/transactions"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-white/20 text-white font-semibold"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                💳 Transactions
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-[75%] h-full flex justify-center items-center p-10 overflow-y-auto">
        <div className="w-full h-full bg-white rounded-2xl shadow-md p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
