import { NavLink } from "react-router";

interface SidebarItemProps {
  content: string;
  to: string;
}

const SidebarItem = ({ content, to }: SidebarItemProps) => {
  return (
    <>
      <li className="w-full px-4">
        <NavLink
          to={to}
          className={({ isActive }) =>
            `w-full flex px-4 py-2 rounded-xl ${
              isActive
                ? "bg-white/40 text-white font-semibold"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            }`
          }
        >
          <p className="text-lg">{content}</p>
        </NavLink>
      </li>
    </>
  );
};

export default SidebarItem;
