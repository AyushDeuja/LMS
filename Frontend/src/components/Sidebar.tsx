import { useNavigate } from "react-router";
import Button from "./Button";
import SidebarItem from "./SidebarItem";
import { LogOut } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      navigate("/login");
    }, 2000); // Navigate after the toast is displayed
  };

  return (
    <aside className="w-1/4 h-full bg-gradient-to-b from-indigo-700 to-purple-600 text-white shadow-2xl flex flex-col">
      {/* Title and Logo */}
      <div className="p-6 border-b border-white/20">
        <h1 className="text-3xl font-extrabold tracking-wide">📘 LMS APP</h1>
      </div>

      {/* Menu Items */}
      <nav className="p-6 flex-1">
        <ul className="space-y-3 text-lg">
          <SidebarItem content="📚 Books" to="/books" />
          <SidebarItem content="👥 Members" to="/members" />
          <SidebarItem content="💳 Transactions" to="/transactions" />
        </ul>
      </nav>
      <div>
        <Button
          className="bg-red-500 hover:bg-red-700"
          type="button"
          label="Log Out"
          noRounded
          onClick={handleLogOut}
          buttonIcon={<LogOut />}
        />
        <ToastContainer />
      </div>
    </aside>
  );
};

export default Sidebar;
