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
          ? "text-gray-900 bg-white border-gray-300 focus:outline-none hover:bg-gray-100 rounded-lg md:text-lg px-5 py-2.5 font-bold transition-all duration-300"
          : "text-gray-900 bg-transparent border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg md:text-lg px-5 py-2.5 transition-all duration-300"
      }
    >
      {children}
    </NavLink>
  );
};
export default CustomNavLink;
