import { SidebarLink } from "@/components/SidebarItems";
import { Cog, Link2Icon } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Links", icon: Link2Icon },
  { href: "/dashboard/settings", title: "Settings", icon: Cog },
];
