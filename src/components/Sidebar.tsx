import Link from "next/link";

import SidebarItems from "./SidebarItems";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { AuthSession, getUserAuth } from "@/lib/auth/utils";

const Sidebar = async () => {
  const session = await getUserAuth();
  if (session.session === null) return null;

  return (
    <aside className="h-full min-w-52 bg-muted/50 hidden md:block p-4 pt-8 border-r border-border shadow-inner absolute bottom-0 left-0 top-0">
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-4">
          <SidebarItems />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

const UserDetails = ({ session }: { session: AuthSession }) => {
  if (session.session === null) return null;
  const { user } = session.session;
  if (!user?.name || user.name.length == 0) return null;

  return (
    <Link href="/account">
      <div className="flex items-center justify-between w-full border-t border-border pt-4 px-2">
        <div className="text-muted-foreground">
          <p className="text-xs">{user.name ?? "John Doe"}</p>
          <p className="text-xs font-light pr-4">
            {user.email ?? "john@doe.com"}
          </p>
        </div>
        <Avatar className="h-10 w-10">
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
      </div>
    </Link>
  );
};
