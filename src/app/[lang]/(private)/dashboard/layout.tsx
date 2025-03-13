import Header from "@/ui/dashboard/header";
import Sidenav from "@/ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <Header />
      <Sidenav />
      {children}
    </div>
  );
}
