"use client"
import { LogOutIcon, type LucideIcon } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { signOutFirebase } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Spinner } from "./ui/spinner"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const signOut = async () => {
    setLoading(true)
    await signOutFirebase()
    router.push("/sign-in")
    setLoading(false)
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem key="sair">
              <SidebarMenuButton tooltip="Sair" onClick={() => signOut()}>
                {loading ? <Spinner size='small' show={loading} /> : <LogOutIcon />}
                <span>Sair</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}