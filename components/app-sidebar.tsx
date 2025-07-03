"use client"

import type * as React from "react"
import { Home, Bot, List, BarChart3, User, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Space Configuration",
    url: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Robot Details",
    url: "/robot-details",
    icon: Bot,
  },
  {
    title: "Robots List",
    url: "/robots-list",
    icon: List,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
]

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeItem?: string
  onItemClick?: (url: string) => void
}

export function AppSidebar({ activeItem, onItemClick, ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props} className="bg-sidebar-gradient border-r-0 text-white">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full overflow-hidden">
  <img src="/images/image.png" alt="Logo" className="w-full h-full object-cover" />
</div>

          <span className="text-white font-semibold text-lg">SteriBOT</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeItem === item.url}
className="text-white data-[active=true]:bg-[#0C6980]"
style={{
  '--hover-bg': ' #0C6980'
}}
                  onClick={() => onItemClick?.(item.url)}
                  >
                    <button className="w-full flex items-center gap-3 p-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
