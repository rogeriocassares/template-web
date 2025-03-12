import Header from "@/ui/dashboard/header";
import Sidenav from "@/ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <Header  />

      {/* <div className={`transition-transform duration-800 pt-16 "w-64"`}> */}
        <Sidenav  />
      {/* </div> */}

      <div className="flex-grow p-6 md:overflow-y-auto md:pt-20 py-8">{children}</div>
    </div>
  );
}