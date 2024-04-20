'use server';

import * as z from 'zod';

import { ResetSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid emaiL!' };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: 'Email not found!' };
  }

  const passwordResetTokens = await generatePasswordResetToken(email);

  if (
    passwordResetTokens.length > 0 &&
    passwordResetTokens[0].email &&
    passwordResetTokens[0].token
  ) {
    const passwordResetToken = passwordResetTokens[0];
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token
    );
  } else {
    console.error('Failed to generate a password reset token.');
  }

  return { success: 'Reset email sent!' };
};
