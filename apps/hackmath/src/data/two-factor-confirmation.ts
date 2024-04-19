import db from "@/db/drizzle";
import { twoFactorConfirmations } from "@/db/schema";
import { eq } from "drizzle-orm";


export const getTwoFactorConfirmationByUserId = async (
  userId: string
) => {
  try {
    const twoFactorConfirmation = await db
    .select()
    .from(twoFactorConfirmations)
    .where(eq(twoFactorConfirmations.id,  Number(userId)))
    .limit(1)
    .execute();

    if (twoFactorConfirmation.length > 0) {
      return twoFactorConfirmation[0]; 
    } else {
      return null;
    }

  } catch {
    return null;
  }
};