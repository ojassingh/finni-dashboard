import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import finni from "@/../public/finni-logo.svg";
import Image from "next/image";
import { Activity, HomeIcon, Users } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar className="">
      <SidebarHeader className="py-10">
        <Image
          className="h-6"
          src={finni}
          alt="finni logo"
          width={100}
          height={100}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="font-medium tracking-tight">
                <Activity /> Overview
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="font-medium tracking-tight">
                <Users /> Patients
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
