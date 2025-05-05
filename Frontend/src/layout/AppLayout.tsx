import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
// import { useTheme } from "../context/themeContext";

const AppLayout = () => {
  // const { theme } = useTheme();
  // console.log(theme);
  return (
    <div className="w-screen h-screen flex">
      {/* Sidebar component */}
      <Sidebar />
      {/* Main Content */}
      <main className="w-full h-full flex flex-col justify-between overflow-y-auto">
        <div className="w-full h-full p-4 overflow-hidden bg-gray-300">
          <Outlet />
        </div>
        {/* Footer */}
        <footer className="w-full py-3 text-center bg-gradient-to-r from-purple-700 to-blue-700 shadow-lg">
          <p className="text-sm text-white">
            © 2025 Library Management System. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default AppLayout;
