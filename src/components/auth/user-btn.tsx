import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUserAuth } from "@/lib/auth/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SignOut } from "./sign-out";
import UserMenu from "./user-menu";

export default async function UserButton() {
  const { session } = await getUserAuth();

  if (!session?.user)
    return (
      <Link
        href="/dashboard"
        className={buttonVariants({
          variant: "outline",
          className: "group",
        })}
      >
        <span>Get Started</span>
        <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-[2px]" />
      </Link>
    );

  const { user } = session;

  if (user)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          name={user.name ?? "User Menu"}
          className={buttonVariants({
            variant: "ghost",
            size: "icon",
          })}
        >
          {user.name && (
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.image || ""} alt={user.name} />
              <AvatarFallback className="border-border border-2 text-muted-foreground">
                {user.name
                  ? user.name
                      ?.split(" ")
                      .map((word) => word[0].toUpperCase())
                      .join("")
                  : "~"}
              </AvatarFallback>
            </Avatar>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-neutral-400">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <UserMenu />
          <SignOut />
        </DropdownMenuContent>
      </DropdownMenu>
    );
}
