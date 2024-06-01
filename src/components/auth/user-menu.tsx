import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { HomeIcon, LayoutDashboardIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";

const UserMenu = () => {
  const iconSize = 15;

  return (
    <>
      <DropdownMenuItem asChild className="flex gap-2">
        <Link href="/dashboard">
          <LayoutDashboardIcon size={iconSize} />
          <span>Dashboard</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild className="flex gap-2">
        <Link href="/dashboard/settings">
          <SettingsIcon size={iconSize} />
          <span>Settings</span>
        </Link>
      </DropdownMenuItem>
    </>
  );
};

export default UserMenu;
