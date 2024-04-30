import { Sidebar } from '@/components/chat-sidebar'

import { auth } from '@/auth'
import { ChatHistory } from '@/components/chat-history'
import Link from 'next/link'
import Image from 'next/image'
export async function SidebarDesktop() {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  return (
    <Sidebar className="peer absolute inset-y-0 z-30 hidden -translate-x-full border-r bg-muted duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]">
      {/* @ts-ignore */}
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/logo.png" height={40} width={40} alt="Mascot" />
          <h1 className="text-2xl font-extrabold tracking-wide">
            HackMath.
          </h1>
        </div>
      </Link>
      <ChatHistory userId={session.user.id} />
    </Sidebar>
  )
}