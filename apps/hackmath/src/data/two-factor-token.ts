import db from '@/db/drizzle';
import { twoFactorTokens } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db
      .select()
      .from(twoFactorTokens)
      .where(eq(twoFactorTokens.token, token))
      .limit(1)
      .execute();
      if (twoFactorToken.length > 0) {
        return twoFactorToken[0]; 
      } else {
        return null;
      }
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db
      .select()
      .from(twoFactorTokens)
      .where(eq(twoFactorTokens.email, email))
      .limit(1)
      .execute();
      if (twoFactorToken.length > 0) {
        return twoFactorToken[0]; 
      } else {
        return null;
      }
  } catch {
    return null;
  }
};
