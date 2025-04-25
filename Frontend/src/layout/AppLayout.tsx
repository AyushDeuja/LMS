import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

const AppLayout = () => {
  return (
    <div className="w-screen h-screen flex font-sans bg-gradient-to-tr from-gray-100 via-white to-gray-200">
      {/* Sidebar component */}
      <Sidebar />
      {/* Main Content */}
      <main className="w-full h-full flex justify-center items-center p-8 overflow-y-auto">
        <div className="w-full h-full bg-white rounded-2xl shadow-lg p-8 overflow-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
