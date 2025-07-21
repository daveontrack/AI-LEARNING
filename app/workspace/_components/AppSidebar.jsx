"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Book,
  Compass,
  LayoutDashboard,
  PencilRulerIcon,
  UserCircle2Icon,
  WalletCards,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AddNewCourseDialog from "./AddNewCourseDialog";

// renamed icons -> icon
const SideBarOptions = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/workspace" },
  { title: "My Learning", icon: Book, path: "/workspace/my-learning" },
  { title: "Explore Courses", icon: Compass, path: "/workspace/explore" },
  { title: "Ai Tools", icon: PencilRulerIcon, path: "/workspace/ai-tools" },
  { title: "Billing", icon: WalletCards, path: "/workspace/billing" },
  { title: "Profile", icon: UserCircle2Icon, path: "/workspace/profile" },
];

export function AppSidebar() {
  const path = usePathname();

  // helpful debug
  console.log({
    Sidebar,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
  });

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Image src="/logo.svg" alt="logo" width={25} height={20} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <AddNewCourseDialog>
          <div>
            <Button>Create New Course</Button>
          </div>
        </AddNewCourseDialog>
        <SidebarGroup />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SideBarOptions.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild className="p-5">
                    <Link
                      href={item.path}
                      className={` text-[17px] ${
                        path.includes(item.path)
                          ? "text-primary bg-purple-50"
                          : "hover:bg-muted"
                      }`}
                    >
                      <item.icon className="h-6 w-6" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <span className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Dawit
        </span>
      </SidebarFooter>
    </Sidebar>
  );
}
