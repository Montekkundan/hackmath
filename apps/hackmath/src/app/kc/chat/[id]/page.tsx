// @ts-nocheck
import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { auth } from '@/auth'
import { getChat, getMissingKeys } from '@/app/kc/actions'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { Session } from '@/lib/types'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  console.log('params', params)
  const session = await auth()

  if (!session?.user) {
    return {}
  }
  console.log('session', session)
  const chat = await getChat(params.id)
  return {
    title: chat?.title.toString().slice(0, 50) ?? 'Chat'
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  if (!session?.user) {
    redirect(`/login?next=/kc/chat/${params.id}`)
  }

  const chat = await getChat(params.id)
  console.log('chat', chat)
  if (!chat) {
    redirect('/')
  }

  if (chat?.userId !== session?.user?.id) {
    notFound()
  }

  return (
    <AI
      initialAIState={{
        chatId: chat.id,
        messages: chat.messages,
        interactions: []
      }}
    >
      <Chat
        id={chat.id}
        session={session}
        initialMessages={chat.messages}
        missingKeys={missingKeys}
      />
    </AI>
  )
}