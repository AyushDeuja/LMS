import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

const AppLayout = () => {
  return (
    <div className="w-screen h-screen flex ">
      {/* Sidebar component */}
      <Sidebar />
      {/* Main Content */}
      <main className="w-full h-full flex justify-center items-center p-4 overflow-y-auto">
        <div className="w-full h-full bg-slate-200 rounded-2xl shadow-lg p-4 overflow-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
