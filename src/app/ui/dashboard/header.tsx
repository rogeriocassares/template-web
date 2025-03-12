import Image from "next/image";
import { PowerIcon, Bars3Icon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-neutral-300">
      <div className="mx-auto flex h-14 md:h-16 items-center justify-between px-6 sm:px-8 lg:px-10">
        <div className="flex space-x-4 sm:space-x-6 items-center">
          <div className="flex items-center space-x-2">
            <Image
              priority
              src="/assets/images/next.svg"
              height={100}
              width={100}
              alt="Template"
              className="h-10 w-20"
            />
            <p className="text-lg md:text-2xl">Template App</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-100 hover:text-gray-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
