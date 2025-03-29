"use client";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { SidenavDesktop } from "./sidenav";
import { useState } from "react";

export function SidenavWrapper() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="z-50"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <Bars3BottomLeftIcon className="w-6" />
      </button>
      <div className="fixed left-0 flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div
          className={`hidden md:block flex-none mt-32 ${open ? "w-64" : "w-min"}`}
        >
          <SidenavDesktop state={open} />
        </div>
      </div>
    </>
  );
}
