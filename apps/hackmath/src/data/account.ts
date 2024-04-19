import db from "@/db/drizzle";
import { accounts } from "@/db/schema";
import { eq } from "drizzle-orm";


export const getAccountByUserId = async (userId: number) => {
  try {
    const account = await db
    .select()
    .from(accounts)
    .where(eq(accounts.id,  Number(userId)))
    .limit(1)
    .execute();

    if (account.length > 0) {
      return account[0]; 
    } else {
      return null;
    }
  } catch {
    return null;
  }
};