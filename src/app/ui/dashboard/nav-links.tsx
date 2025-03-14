"use client";

import * as Icons from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Home", href: "/dashboard/", icon: Icons.BellAlertIcon },
  { name: "Apps", href: "/dashboard/apps", icon: Icons.CubeIcon },
  { name: "Settings", href: "/dashboard/settings", icon: Icons.Cog6ToothIcon },
  { name: "External Link", href: "https://maua.br", icon: Icons.DocumentIcon, external: true, blank: true },
];

// export default function Sidebar() {
//   const pathname = usePathname() || "";

//   return (
//     <nav className={clsx("h-screen py-4 w-48 p-1 bg-white dark:bg-gray-500 overflow-y-hidden")}> 
//       <ul className="space-y-2 mt-4">
//         {links.map((link) => {
//           const LinkIcon = link.icon;
//           return (
//             <li key={link.name}>
//               {link.blank ? (
//                 <button
//                   onClick={() => window.open(link.href, "_blank", "noopener,noreferrer")}
//                   className={clsx(
//                     "flex items-center gap-2 p-2 rounded-md hover:bg-gray-100",
//                     pathname === link.href && "bg-gray-200"
//                   )}
//                 >
//                   <LinkIcon className="w-6 h-6" />
//                   <span>{link.name}</span>
//                 </button>
//               ) : (
//                 <Link
//                   href={link.href}
//                   className={clsx(
//                     "flex items-center gap-2 p-2 rounded-md hover:bg-gray-100",
//                     pathname === link.href && "bg-gray-200"
//                   )}
//                 >
//                   <LinkIcon className="w-6 h-6" />
//                   <span>{link.name}</span>
//                 </Link>
//               )}
//             </li>
//           );
//         })}
//       </ul>
//     </nav>
//   );
// }

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-300 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-gray-400 text-blue-600": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

