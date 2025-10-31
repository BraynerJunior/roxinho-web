import { Home } from "lucide-react";
import { IoMdPerson } from "react-icons/io";
import { BsController } from "react-icons/bs";
import { BiMedal } from "react-icons/bi";
import { IoPersonOutline } from "react-icons/io5";
import { RiMegaphoneLine } from "react-icons/ri";
import { GoPerson } from "react-icons/go";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Roxinho Web",
    url: "/roxinho",
    icon: IoMdPerson,
  },
  {
    title: "Roxinho News",
    url: "/roxinho-news",
    icon: IoMdPerson,
  },
  {
    title: "Campanha News",
    url: "/campanha-news",
    icon: RiMegaphoneLine,
  },
  {
    title: "Nossos Resultados",
    url: "/our-results",
    icon: BiMedal,
  },
  {
    title: "Verbatins Month",
    url: "/verbatins-month",
    icon: IoMdPerson,
  },
  {
    title: "Gaming",
    url: "/gaming",
    icon: BsController,
  },
  {
    title: "DeFrenteCom",
    url: "/defrentecom",
    icon: GoPerson,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="[&>svg]:size-8 my-2">
                    <Link
                      href={item.url}
                      className="py-6 bg-violet-eggplant-300 hover:bg-violet-eggplant-400"
                    >
                      <item.icon className="text-violet-eggplant-800"/>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
