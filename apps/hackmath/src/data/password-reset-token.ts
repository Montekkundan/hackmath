import db from '@/db/drizzle';
import { passwordResetTokens } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token))
      .limit(1)
      .execute();
    if (passwordResetToken.length > 0) {
      return passwordResetToken[0];
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.email, email))
      .limit(1)
      .execute();
    if (passwordResetToken.length > 0) {
      return passwordResetToken[0];
    } else {
      return null;
    }
  } catch {
    return null;
  }
};
