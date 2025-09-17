"use client";

import * as React from "react";
import {
  Box,
  Folder,
  ListTodoIcon,
  Mail,
  SquareTerminal,
  Text,
  TrendingUp,
  User,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { NavProjects } from "./nav-projects";
import { ThemeProvider } from "./theme-provider";

// This is sample data.
const data = {
  user: {
    name: "",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Crypto",
          url: "#",
        },
        {
          title: "Crm",
          url: "#",
        },
        {
          title: "Intranet",
          url: "#",
        },
        {
          title: "eCommerce",
          url: "#",
        },
        {
          title: "News",
          url: "#",
        },
        {
          title: "Misc",
          url: "#",
        },
      ],
    },
    {
      title: "Components",
      url: "#",
      icon: Folder,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Wedgets",
      url: "#",
      icon: Box,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Metrics",
      url: "#",
      icon: TrendingUp,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Mail",
      url: "#",
      icon: Mail,
    },
    {
      name: "To-Do",
      url: "#",
      icon: ListTodoIcon,
    },
    {
      name: "Contact",
      url: "#",
      icon: User,
    },
    {
      name: "Chat",
      url: "#",
      icon: Text,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const state = useSelector((state: RootState) => state.user.user);

  if (state) {
    data.user.email = state.email;
    data.user.name = `${state.firstname} ${state.lastname}`;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <ThemeProvider defaultTheme="light">
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </ThemeProvider>
      <SidebarRail />
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
    </Sidebar>
  );
}
