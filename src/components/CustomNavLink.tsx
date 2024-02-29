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
          ? "p-2 rounded-md transition-all duration-300 hover:bg-[#EEE5E9] text-lg font-bold"
          : "p-2 rounded-md transition-all duration-300 hover:bg-[#CECECE] text-lg"
      }
    >
      {children}
    </NavLink>
  );
};
export default CustomNavLink;
