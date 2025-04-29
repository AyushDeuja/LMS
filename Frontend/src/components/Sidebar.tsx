import { useNavigate } from "react-router";
import Button from "./Button";
import SidebarItem from "./SidebarItem";
import { LogOut } from "lucide-react";
// import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handlePopUptoConfirm = () => {
    setShowConfirmation(true);
  };
  const handlePopUptoCancel = () => {
    setShowConfirmation(false);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
        {showConfirmation && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-white text-black shadow-lg rounded-lg font-bold">
            <p className="mb-4 text-center text-xl">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-between mt-8">
              <Button
                className="bg-green-500 hover:bg-green-700 p-5 bg-none"
                type="button"
                label="Yes"
                onClick={handleLogOut}
              />
              <Button
                className="bg-gray-500 hover:bg-gray-700 p-6 bg-none"
                type="button"
                label="No"
                onClick={handlePopUptoCancel}
              />
            </div>
          </div>
        )}
        <Button
          className="bg-red-500 hover:bg-red-700 bg-none py-2.5"
          type="button"
          label="Log Out"
          noRounded
          onClick={handlePopUptoConfirm}
          buttonIcon={<LogOut />}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
