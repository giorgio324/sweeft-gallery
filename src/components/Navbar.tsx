import CustomNavLink from "./CustomNavLink";

const Navbar = () => {
  return (
    <nav className="bg-[#006992] py-2 mb-8">
      <div className="max-w-screen-xl px-4 mx-auto flex justify-between items-center">
        <CustomNavLink to="/">Home</CustomNavLink>
        <CustomNavLink to="/history">History</CustomNavLink>
      </div>
    </nav>
  );
};
export default Navbar;
