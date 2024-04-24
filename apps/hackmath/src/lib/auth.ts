import { auth } from "@/auth";
import db from "@/db/drizzle";
import { userData } from "@/db/schema";
import { sql } from "drizzle-orm";
export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};

export const currentUserId = async () => {
  const session = await auth();

  return session?.user?.id;
  };

  export const currentUserData = async () => {
    const userId = await currentUserId();
    
    if (!userId) return null;
    
    const userRecords = await db.select().from(userData).where(sql`${userData.userId} = ${userId}`).execute();
    
    return userRecords[0];
  };
