import Link from "next/link";
import { cn } from "@/lib/utils";
import Logo from "@/components/icons/logo";
import UserButton from "@/components/auth/user-btn";
import { ModeToggle } from "../ui/ThemeToggle";

const Header = () => {
  return (
    <nav
      className={cn(
        "flex w-full",
        "pb-3 pt-4 lg:px-4",
        "sticky top-0 z-50",
        "bg-background border-b"
      )}
    >
      <div
        className={cn("flex w-full items-center justify-between", "container")}
      >
        <div className="flex items-center space-x-5">
          <div className="flex items-center space-x-1 pr-1 md:pr-4">
            <Link
              href="/"
              className="flex items-center space-x-3 transition-opacity hover:opacity-80 rtl:space-x-reverse"
            >
              <Logo className="h-8 w-8" />
              <span className="self-center whitespace-nowrap text-base font-medium dark:text-white">
                ziplink
              </span>
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Header;
