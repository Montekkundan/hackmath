import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from 'drizzle-orm';
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
    .execute();
    if (user.length > 0) {
      return user[0]; 
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    
    const user = await db
    .select()
    .from(users)
    .where(eq(users.id,  Number(id)))
    .limit(1)
    .execute();

    if (user.length > 0) {
      return user[0]; 
    } else {
      return null;
    }
  } catch {
    return null;
  }
};