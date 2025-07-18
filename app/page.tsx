"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Dashboard } from "@/components/dashboard"
import { Profile } from "@/components/profile"
import { RobotDetails } from "@/components/robot-details"
import { RobotsList } from "@/components/robots-list"
import { SterilizationHistory } from "@/components/sterilization-history"
import { ObstacleDetection } from "@/components/obstacle-detection"

export default function Page() {
  const [activeView, setActiveView] = useState("/dashboard")

  const renderContent = () => {
    switch (activeView) {
      case "/dashboard":
        return <Dashboard />
      case "/profile":
        return <Profile />
      case "/robot-details":
        return <RobotDetails />

        case "/robots-list":
          return <RobotsList />
          case "/sterilization-history":
        return <SterilizationHistory />
        case "/obstacle-detection":
          return <ObstacleDetection />

          default:
            return <Dashboard />

    }
  }

  return (
    <SidebarProvider>
      <AppSidebar activeItem={activeView} onItemClick={setActiveView} />
      <SidebarInset>{renderContent()}</SidebarInset>
    </SidebarProvider>
  )
}
