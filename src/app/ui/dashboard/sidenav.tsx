import NavLinks from "./nav-links";

export default function Sidenav() {
  return (
    <nav
      // className={`fixed top-14 w-60 overflow-y-auto overflow-y-hidden absolute z-10`}
    >
      <div className="flex grow flex-row justify-between space-x-2 transition-transform duration-100 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
      </div>
    </nav>
  );
}

