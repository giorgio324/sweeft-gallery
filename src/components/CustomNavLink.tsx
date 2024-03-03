import { NavLink } from "react-router-dom";
type CustomNavLinkType = {
  children: React.ReactNode;
  to: string;
};
const CustomNavLink = ({ to, children }: CustomNavLinkType) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "p-2 rounded-sm transition-all duration-300 hover:bg-gray-300 md:text-xl font-bold"
          : "p-2 rounded-sm transition-all duration-300 hover:bg-gray-300 md:text-xl"
      }
    >
      {children}
    </NavLink>
  );
};
export default CustomNavLink;
