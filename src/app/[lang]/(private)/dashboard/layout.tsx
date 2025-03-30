import Header from "@/ui/header";
import { SidenavDesktop, SidenavMobile } from "@/ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="md:overflow-y-auto w-screen mt-32">{children}</div>
      {/* <div className="md:hidden w-full flex-none md:w-64 "> */}
      <SidenavMobile />
    </>
  );
}
