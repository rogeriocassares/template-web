import {
  Avatar,
  // AvatarFallback,
  AvatarImage,
} from "@/ui/avatar";
import { Button } from "@/ui/button";
import { auth } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
// import { SignIn } from "@/ui/auth/signin-button";
import { SignOut } from "@/ui/auth/signout-button";
import Link from "next/link";

export default async function UserButton() {
  const session = await auth();
  if (!session?.user) return (<Link
    className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
    href={"/api/auth/signin"}
    // target="_blank"
    // rel="noopener noreferrer"
  >
    Login
  </Link>)
  
  // <SignIn />;
  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm sm:inline-flex">
        {session.user.email}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={
                  session.user.image ??
                  `https://api.dicebear.com/9.x/thumbs/svg?seed=${
                    Math.floor(Math.random() * 100000) + 1
                  }&randomizeIds=true`
                }
                alt={session.user.name ?? ""}
              />
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user.name}
              </p>
              <p className="text-muted-foreground text-xs leading-none">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem>
            {/* DISCOVER WHY INSIDE DROPDOWNMENUITEM THE ACTION SIGNOUT NOT WORKS */}
          </DropdownMenuItem>
            <SignOut />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
