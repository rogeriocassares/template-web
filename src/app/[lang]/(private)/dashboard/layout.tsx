import Header from "@/ui/header";
import { SidenavDesktop, SidenavMobile } from "@/ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
  
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="hidden md:block flex-none mt-32 w-64">
          <SidenavDesktop />
        </div>
        <div className="flex-grow md:overflow-y-auto mt-32">
          {children}
        </div>
        {/* <div className="md:hidden w-full flex-none md:w-64 "> */}
        <div className="md:hidden">
          <SidenavMobile />
        </div>
      </div>
      </>
  );
}
