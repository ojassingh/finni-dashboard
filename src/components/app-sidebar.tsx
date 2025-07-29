import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import finni from "@/../public/finni-logo.svg";
import Image from "next/image";

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
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
