import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

import { getVerificationTokenByEmail } from '@/data/verification-token';
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import db from '@/db/drizzle';
import {
  passwordResetTokens,
  verificationTokens,
  twoFactorTokens,
} from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);

  console.log('existingToken', existingToken);

  if (existingToken) {
    await db
      .delete(twoFactorTokens)
      .where(eq(twoFactorTokens.id, existingToken.id));
  }
  await db
    .insert(twoFactorTokens)
    .values({
      email,
      token,
      expires,
    })
    .execute();
  const twoFactorToken = await db
    .select()
    .from(twoFactorTokens)
    .where(eq(twoFactorTokens.email, email))
    .orderBy(desc(twoFactorTokens.id))
    .limit(1)
    .execute();

  console.log('twoFactorToken', twoFactorToken);

  return twoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db
      .delete(passwordResetTokens)
      .where(eq(passwordResetTokens.id, existingToken.id));
  }

  await db
    .insert(passwordResetTokens)
    .values({
      email,
      token,
      expires,
    })
    .execute();

  const passwordResetToken = await db
    .select({
      email: passwordResetTokens.email,
      token: passwordResetTokens.token,
    })
    .from(passwordResetTokens)
    .where(eq(passwordResetTokens.email, email))
    .orderBy(desc(passwordResetTokens.id))
    .limit(1)
    .execute();

  return passwordResetToken;
};


export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken && existingToken.length > 0) {
    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.id, existingToken[0].id))
      .execute();
  }

  await db
    .insert(verificationTokens)
    .values({
      email: email,
      token: token,
      expires: expires,
    })
    .execute();

  const verificationToken = await db
    .select({
      email: verificationTokens.email,
      token: verificationTokens.token,
    })
    .from(verificationTokens)
    .where(eq(verificationTokens.email, email))
    .orderBy(desc(verificationTokens.id))
    .limit(1)
    .execute();
  return verificationToken;
};
