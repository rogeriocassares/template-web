"use client";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { SidenavDesktop } from "./sidenav";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function SidenavWrapper() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <div className="inline-block">
      <div className="fixed z-50 left-8 top-4">
        <button
          className="hidden md:inline-block"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <Bars3BottomLeftIcon className="w-6" />
        </button>
      </div>
      <div className="flex flex-col md:flex-row md:overflow-hidden">
        <div
          className={`hidden md:inline-block flex-none mt-32 ${open ? "w-64" : "w-min"}`}
        >
          <SidenavDesktop state={open} />
        </div>
      </div>
    </div>
  );
}
