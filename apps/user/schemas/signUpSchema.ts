import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email().regex(/@lnmiit\.ac\.in$/, {
    message: "Email must be an institute email ending with @lnmiit.ac.in",
  }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});
