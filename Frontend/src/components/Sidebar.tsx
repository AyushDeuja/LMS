import { useNavigate } from "react-router";
import Button from "./Button";
import SidebarItem from "./SidebarItem";
import {
  Banknote,
  BookTextIcon,
  LogOut,
  MoonStarIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import Modal from "./Modal";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/themeContext";

const Sidebar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const openConfirmationModal = () => {
    setShowConfirmation(true);
  };

  const closeConfirmationModal = () => {
    setShowConfirmation(false);
  };

  return (
    <aside className="w-1/4 h-full bg-gradient-to-b from-indigo-700 to-purple-600 text-white shadow-2xl flex flex-col">
      {/* Title and Logo */}
      <div className="p-3 py-6 border-b border-white/20 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-wide">📘 LMS APP</h1>
        {theme === "light" ? (
          <MoonStarIcon onClick={toggleTheme} className="cursor-pointer" />
        ) : (
          <SunIcon
            onClick={toggleTheme}
            className="text-yellow-300 cursor-pointer"
          />
        )}
      </div>

      {/* Menu Items */}
      <nav className="p-6 flex-1">
        <ul className="space-y-3 text-lg">
          <SidebarItem icon={<BookTextIcon />} content="Books" to="/books" />
          <SidebarItem icon={<UserIcon />} content="Members" to="/members" />
          <SidebarItem
            icon={<Banknote />}
            content="Transactions"
            to="/transactions"
          />
        </ul>
      </nav>

      {/* Logout Button */}
      <div>
        <Button
          className="bg-red-500 hover:bg-red-700 bg-none py-2.5"
          type="button"
          label="Log Out"
          noRounded
          onClick={openConfirmationModal}
          buttonIcon={<LogOut />}
        />
      </div>

      {/* Confirmation Modal */}
      <Modal
        isModalOpen={showConfirmation}
        onClose={closeConfirmationModal}
        onConfirm={handleLogOut}
        content="Are you sure you want to Log Out?"
        title="Log Out"
        primaryButtonLabel="Log Out"
      />
    </aside>
  );
};

export default Sidebar;
