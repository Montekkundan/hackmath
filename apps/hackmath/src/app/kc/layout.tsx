import { SidebarDesktop } from '@/components/sidebar-desktop'
import { SidebarProvider } from '@/lib/hooks/use-sidebar'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <SidebarProvider>
      <SidebarDesktop />
    <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
      
      {children}
    </div>
    </SidebarProvider>
  )
}