"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import db from "@/db/drizzle";
import { users } from "@/db/schema";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
    image: "/logo.png"
  });

  const verificationTokens = await generateVerificationToken(email);
  if (verificationTokens.length > 0 && verificationTokens[0].email && verificationTokens[0].token) {
    const verificationToken = verificationTokens[0];
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );
  } else {
    console.error('Failed to generate a valid verification token.');
  }

  return { success: "Confirmation email sent!" };
};