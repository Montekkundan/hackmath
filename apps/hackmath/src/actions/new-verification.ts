"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import db from "@/db/drizzle";
import { users, verificationTokens } from "@/db/schema";
import { eq } from "drizzle-orm";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  console.log('existingToken', existingToken);
  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken[0].expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken[0].email);
  console.log('existingUser', existingUser);
  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  await db.update(users)
  .set({
    emailVerified: new Date(),
    email: existingToken[0].email,
  })
  .where(eq(users.id, existingUser.id))
  .execute();

  await db.delete(verificationTokens)
  .where(eq(verificationTokens.id, existingToken[0].id))
  .execute();

  return { success: "Email verified!" };
};