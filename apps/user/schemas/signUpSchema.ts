import { z } from 'zod';

// export const signUpSchema = z.object({
//   email: z.string().email() {
//     message: "Email must end with @lnmiit.ac.in",
//   }),
//   password: z
//     .string()
//     .min(8, { message: 'Password must be at least 8 characters' }),
//   // conformPassword: z
//   // .string()
//   // .min(8, { message: 'Password must be at least 8 characters' }),  
// })
// // .refine((data) => data.password === data.conformPassword, {
// //   message: "Passwords don't match",
// //   path: ['confirmPassword'], // Points to where the error should appear
// // });
export const signUpSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});
