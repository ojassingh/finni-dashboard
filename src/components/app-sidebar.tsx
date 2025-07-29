"use client";
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
import { Activity, HeartHandshake, Mail, Sparkles, Users } from "lucide-react";
import { AddPatientDialog } from "../app/patients/add-patient-dialog";
import Link from "next/link";
import { toast } from "sonner";

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
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <AddPatientDialog />
            </SidebarMenuItem>
            <SidebarMenuItem className="mt-4">
              <Link href="/">
                <SidebarMenuButton className="font-medium tracking-tight">
                  <Activity /> Overview
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/patients">
                <SidebarMenuButton className="font-medium tracking-tight">
                  <Users /> Patients
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/ai">
                <SidebarMenuButton className="font-medium tracking-tight">
                  <Sparkles /> Finni AI
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="https://www.finnihealth.com/" target="_blank">
              <SidebarMenuButton className="font-medium tracking-tight">
                <HeartHandshake /> Learn more
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                navigator.clipboard.writeText("care@finnihealth.com");
                toast.success("Email copied!");
              }}
              className="font-medium tracking-tight"
            >
              <Mail /> Contact us
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
