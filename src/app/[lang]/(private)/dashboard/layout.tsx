import Header from "@/ui/header";
import {
  // SidenavDesktop,
  // SidenavMobile,
} from "@/ui/dashboard/sidenav";
// import { SidenavWrapper } from "@/app/ui/dashboard/sidenav-wrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header isDashboard={true} />
      <div className="flex">
        {/* <SidenavWrapper /> */}
        <div className=" md:overflow-y-auto w-screen mt-32">{children}</div>
      </div>
      {/* <div className="md:hidden w-full flex-none md:w-64 "> */}
      {/* <SidenavMobile /> */}
    </>
  );
}
