import NavLinks from "./nav-links";

export function SidenavMobile() {
  return (
    <div className="flex grow flex-row justify-between space-x-2">
      <NavLinks state={false} />
    </div>
  );
}

export function SidenavDesktop({ state }: { state: boolean }) {
  return (
    <div className="flex h-full flex-col px-3">
      {/* <Link
      className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
      href="/"
    >
      <div className="w-32 text-white md:w-40">
        <AcmeLogo />
      </div>
    </Link> */}
      {/* <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2"> */}
      <div className="flex justify-between md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks state={state} />
        {/* <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div> */}
      </div>
    </div>
  );
}
