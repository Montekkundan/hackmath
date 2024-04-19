"use server";

import * as z from "zod";
import AuthError from "next-auth";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { 
  sendVerificationEmail,
  sendTwoFactorTokenEmail,
} from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { 
  generateVerificationToken,
  generateTwoFactorToken
} from "@/lib/tokens";
import { 
  getTwoFactorConfirmationByUserId
} from "@/data/two-factor-confirmation";
import db from "@/db/drizzle";
import { twoFactorConfirmations, twoFactorTokens } from "@/db/schema";
import { eq } from "drizzle-orm";

interface AuthError extends Error {
  type: string;
}

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" }
  }

  if (!existingUser.emailVerified) {
    if (existingUser.email) {
      const verificationToken = await generateVerificationToken(
        existingUser.email,
      );

      await sendVerificationEmail(
        verificationToken[0].email,
        verificationToken[0].token,
      );

      return { success: "Confirmation email sent!" };
    } else {
      return { error: "Email does not exist!" };
    }
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(
        existingUser.email
      );

      if (!twoFactorToken) {
        return { error: "Invalid code!" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Invalid code!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Code expired!" };
      }

      const userId = existingUser.id.toString();

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        userId
      );

      if (existingConfirmation) {
        await db.delete(twoFactorConfirmations).where(eq(twoFactorConfirmations.id, existingConfirmation.id));
      }

      await db.insert(twoFactorConfirmations).values({
        userId: existingUser.id,
      });
    } else {
      const twoFactorToken: any = await generateTwoFactorToken(existingUser.email)
      console.log('twoFactorToken', twoFactorToken);
      if (twoFactorToken && twoFactorToken.email && twoFactorToken.token) {
        await sendTwoFactorTokenEmail(
          twoFactorToken.email,
          twoFactorToken.token,
        );
      } else {
        console.error('Failed to generate or retrieve two-factor token');
      }

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
        email,
        password,
        redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
} catch (error: any) { 
    const authError = error as AuthError;
    switch (authError.type) {
        case "CredentialsSignin":
            return { error: "Invalid credentials!" };
        default:
            return { error: "Something went wrong!" };
    }
}
};