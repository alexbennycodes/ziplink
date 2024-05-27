"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

export function SignOut() {
  const handleLogout = async () => {
    toast.promise(signOut, {
      loading: "Signing out...",
      error: "Failed to sign out. Please try again.",
    });
  };

  return (
    <DropdownMenuItem onClick={handleLogout} className="flex gap-2">
      <LogOutIcon size={15} />
      <span>Log Out</span>
    </DropdownMenuItem>
  );
}
