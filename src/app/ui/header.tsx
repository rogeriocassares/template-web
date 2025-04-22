import Image from "next/image";
// import { PowerIcon, Bars3Icon } from "@heroicons/react/24/outline";
// import { SignOut } from "@/ui/auth/signout-button";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import UserButton from "@/app/ui/auth/user-button";
import { SidenavDesktop } from "./dashboard/sidenav";
import { SidenavWrapper } from "./dashboard/sidenav-wrapper";
import { NavMenu } from "./public/NavMenu";

export default function Header() {
  return (
    <div className="fixed inset-x-0 top-0 z-10 border-b border-gray-200 dark:border-white/10">
      <div className="bg-white dark:bg-gray-500">
        <div className="flex h-14 items-center justify-between gap-8 px-4 md:px-6">
          <div className="flex flex-row gap-5">
            <SidenavWrapper />
            <Image
              priority
              src="/assets/images/next.svg"
              height={100}
              width={100}
              alt="Template"
              className="h-10 w-20"
            />
          </div>
          <p className="text-lg">Template App</p>
          {/* <SignOut /> */}
          <div className="flex flex-row gap-3">
            <UserButton />
            <NavMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
