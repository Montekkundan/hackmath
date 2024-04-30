'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Message } from 'ai';

import { auth } from '@/auth'
import { ServerActionResult, type Chat } from '@/lib/types'
import db from '@/db/drizzle'
import { chats } from '@/db/schema'
import { eq } from 'drizzle-orm';

async function getCurrentUserId() {
  const session = await auth();
  console.log('session?.user?.id', session?.user?.id)
  return session?.user?.id;
}

export async function getChats(userId?: string | null): Promise<ServerActionResult<Chat[]>> {
  userId = userId || await getCurrentUserId();
  if (!userId) {
      return { error: "Unauthorized" };
  }

  try {
    const userChats = await db.query.chats.findMany({
      where: (table) => table.userId.eq(userId)
    });
      if (!userChats) {
          return []; // Return empty array if no chats found
      }
      // Deserialize messages for each chat and handle potential parsing errors
      return userChats.map(chat => ({
          ...chat,
          messages: JSON.parse(chat.messages || '[]') // Safe parsing
      }));
  } catch (error) {
      console.error('Error retrieving chats:', error);
      return { error: 'Database error' };
  }
}


export async function getChat(id: string): Promise<ServerActionResult<Chat | null>> {
  const userId = await getCurrentUserId();
  if (!userId) {
    console.error('User ID not found for chat retrieval');
    return null;
  }

  try {
    const chat = await db.query.chats.findFirst({
      where: {
        id: id,
        userId: userId
      }
    });
    if (!chat) {
      console.error('Chat not found or user ID mismatch', { id, userId });
      return null;
    }
    // Deserialize messages
    return { ...chat, messages: JSON.parse(chat.messages) };
  } catch (error) {
    console.error('Error retrieving chat:', error);
    return null;
  }
}



export async function removeChat({ id, path }: { id: string; path: string }): Promise<ServerActionResult<{ success: boolean }>> {
  const session = await auth();
  if (!session?.user) {
    return { error: 'Unauthorized' };
  }

  try {
    await db.delete(chats).where(eq(chats.id, id), eq(chats.userId, Number(session.user.id))).execute();
    revalidatePath(path);
    return { success: true };
  } catch (error) {
    console.error('Error removing chat:', error);
    return { error: 'Database error' };
  }
}


export async function clearChats(): Promise<ServerActionResult<{ success: boolean }>> {
  const session = await auth();
  if (!session?.user) {
    return { error: 'Unauthorized' };
  }

  try {
    await db.delete(chats).where(eq(chats.id, id), eq(chats.userId, Number(session.user.id))).execute();
    return { success: true };
  } catch (error) {
    console.error('Error clearing chats:', error);
    return { error: 'Database error' };
  }
}


export async function getSharedChat(id: string): Promise<Chat | null> {
  try {
    const chat = await db.query(chats).findFirst({
      where: {
        id: id,
        sharePath: { not: null } // Hypothetical approach, adjust based on actual API
      }
    });
    if (!chat) {
      console.error('Shared chat not found or no share path set');
      return null;
    }
    // Deserialize messages before returning
    return { ...chat, messages: JSON.parse(chat.messages) };
  } catch (error) {
    console.error('Error retrieving shared chat:', error);
    return null;
  }
}

export async function shareChat(id: string): Promise<ServerActionResult<Chat>> {
  const session = await auth();
  if (!session?.user) {
    return { error: 'Unauthorized' };
  }

  try {
    const chat = await db.query(chats).where({ id, userId: Number(session.user.id) }).execute(); // Hypothetical, adjust based on actual API
    if (!chat) {
      return { error: 'Chat not found or not owned by user' };
    }

    const updatedChat = {
      ...chat,
      sharePath: `/share/${chat.id}`
    };

    await db.update(chats).set(updatedChat).where({ id }).execute(); // Hypothetical, adjust based on actual API
    return updatedChat;
  } catch (error) {
    console.error('Failed to share chat:', error);
    return { error: 'Database error' };
  }
}


export async function saveChat(chat: Omit<Chat, 'messages'> & { messages: Message[] }): Promise<Chat | { error: string }> {
  const session = await auth();
  if (!session?.user) {
    console.log('Unauthorized attempt to save chat');
    return { error: 'Unauthorized' };
  }

  // Serialize messages to a JSON string
  const serializedMessages = JSON.stringify(chat.messages);

  // Construct the chat object to save
  const chatToSave = {
    ...chat,
    userId: Number(session.user.id),  // Ensure userId is a number
    messages: serializedMessages  // Store messages as a JSON string
  };

  try {
    const result = await db.insert(chats).values(chatToSave).returning('*').execute(); // Hypothetical, adjust based on actual API
    if (result.rows.length > 0) {
      const savedChat = result.rows[0];
      // Deserialize messages when returning the saved chat
      return { ...savedChat, messages: JSON.parse(savedChat.messages) };
    }
    throw new Error('No chat was returned after insert.');
  } catch (error) {
    console.error('Failed to save chat:', error);
    return { error: 'Database error' };
  }
}

export async function refreshHistory(path: string) {
  redirect(path)
}

export async function getMissingKeys() {
  const keysRequired = ['GOOGLE_GENERATIVE_AI_API_KEY']
  return keysRequired
    .map(key => (process.env[key] ? '' : key))
    .filter(key => key !== '')
}