import CustomNavLink from "./CustomNavLink";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 py-2 mb-8">
      <div className="max-w-screen-xl px-4 mx-auto flex justify-between items-center">
        <CustomNavLink to="/">Home</CustomNavLink>
        <h1 className="text-sm md:text-xl font-semibold">
          Unsplash Infinite Gallery
        </h1>
        <CustomNavLink to="/history">History</CustomNavLink>
      </div>
    </nav>
  );
};
export default Navbar;
