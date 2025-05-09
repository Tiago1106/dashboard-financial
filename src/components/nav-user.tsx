"use client"

import { User } from "firebase/auth"

import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


export function NavUser({
  user,
}: {
  user: User | null
}) {
  if (!user) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-start flex-col">        
        <p className="font-medium">{user.displayName}</p>
        <p className="text-xs text-muted-foreground">{user.email}</p>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
