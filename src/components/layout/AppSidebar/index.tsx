import { Home } from "lucide-react";
import { BsController } from "react-icons/bs";
import { BiMedal } from "react-icons/bi";
import { RiMegaphoneLine } from "react-icons/ri";
import { GoPerson } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { ImNewspaper } from "react-icons/im";
import { RiSpeakLine } from "react-icons/ri";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";

const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Roxinho Web",
    url: "/about-us",
    icon: HiOutlineUserGroup,
  },
  {
    title: "Roxinho News",
    url: "/roxinho-news",
    icon: ImNewspaper,
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
    icon: RiSpeakLine,
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
  const style = "bg-violet-eggplant-100";

  return (
    <div className="h-screen flex items-center">
      <Sidebar variant="floating" className="left-0 top-1/2 -translate-y-1/2 w-20.5 h-160 flex justify-center items-center ">
        <SidebarContent className={`${style} rounded-sm flex flex-col items-center justify-center shadow-2xl`}>
          <SidebarGroup className={`${style} rounded-sm flex flex-col items-center justify-center `}>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip delayDuration={0} disableHoverableContent>
                      

                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          asChild
                          className="[&>svg]:size-8 size-12 my-2 "
                        >
                          <Link
                            href={item.url}
                            className="py-6 bg-violet-eggplant-300 hover:bg-violet-eggplant-400 flex justify-center items-center "
                          >
                            <item.icon className="text-violet-eggplant-800" />
                          </Link>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent className="bg-violet-eggplant-400 rounded-md px-2">
                        {item.title}
                        <TooltipArrow className="fill z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-violet-eggplant-400 fill-violet-eggplant-400" />
                      </TooltipContent>
                    </Tooltip>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
