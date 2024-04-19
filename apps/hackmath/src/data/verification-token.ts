import db from '@/db/drizzle';
import { verificationTokens } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db
      .select()
      .from(verificationTokens)
      .where(eq(verificationTokens.token, token))
      .limit(1)
      .execute();
    console.log('verificationToken', verificationToken);
    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db
      .select()
      .from(verificationTokens)
      .where(eq(verificationTokens.email, email))
      .limit(1)
      .execute();
    console.log('verificationToken', verificationToken);
    return verificationToken;
  } catch {
    return null;
  }
};
