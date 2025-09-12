import {
  Clock,
  House,
  Inbox,
  Settings,
  User,
  UserRoundSearch,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import Link from "next/link";

// Menu items.
const itemsStart = [
  {
    title: "Start",
    url: "/",
    icon: House,
  },
  {
    title: "Zeitbuchung",
    url: "time-booking",
    icon: Clock,
  },
  {
    title: "Posteingang",
    url: "inbox",
    icon: Inbox,
  },
  {
    title: "Mitarbeiter",
    url: "employees",
    icon: UserRoundSearch,
  },
];

const itemsAdmin = [
  {
    title: "Benutzer",
    url: "users",
    icon: Users,
  },
];

const itemsEnd = [
  {
    title: "Einstellungen",
    url: "settings",
    icon: Settings,
  },
];

function sidebarMenuItems(items: { title: string; url: string; icon: any }[]) {
  return (
    <>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
}

export function AppSidebar() {
  let admin: boolean = true;

  return (
    <Sidebar>
      <SidebarHeader className="border-sidebar-border h-16 border-b">
        <NavUser user={{ name: "Eric Cartman", avatar: "EC" }} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Allgemein</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{sidebarMenuItems(itemsStart)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {admin && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>{sidebarMenuItems(itemsAdmin)}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>Einstellung</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{sidebarMenuItems(itemsEnd)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
