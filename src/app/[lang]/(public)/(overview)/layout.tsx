import { NavMenu } from "@/app/ui/public/NavMenu";
import Header from "@/ui/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <Header />
      {children}
    </div>
  );
}
