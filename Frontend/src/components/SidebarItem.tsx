import { NavLink } from "react-router";

interface SidebarItemProps {
  content: string;
  to: string;
}

const SidebarItem = ({ content, to }: SidebarItemProps) => {
  return (
    <>
      <li>
        <NavLink
          to={to}
          className={({ isActive }) =>
            `block px-4 py-2 rounded-full transition-all duration-200 ${
              isActive
                ? "bg-white/20 text-white font-semibold"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            }`
          }
        >
          {content}
        </NavLink>
      </li>
    </>
  );
};

export default SidebarItem;
