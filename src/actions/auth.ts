// src/actions/auth.ts

// Ensuring server-side code
'use client';

// Importing necessary modules and components
// import { signIn, signOut } from '@/auth';
import { db } from '@/db';
// import type { User } from '@prisma/client'; --> Commented
// import { AuthError } from 'next-auth';
import { z } from 'zod';
import bcryptjs from 'bcryptjs';
// import nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';
import { redirect } from 'next/navigation';
// import { EmailNotVerifiedError } from '@/errors';
import { signIn, signOut } from 'next-auth/react';

// Authenticating function for sign-in
export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    console.log(formData);
    const signInData = await signIn('Credentials',{
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });
    console.log(signInData);
    // await isUsersEmailVerified(formData.get('email') as string); --> Commented
    // await signIn('credentials', formData);
  } catch (error) {
    // Handling authentication errors
    // if (error instanceof AuthError) {
    //   switch (error.type) {
    //     case 'CredentialsSignin':
    //       return 'Invalid credentials.'; 
    //     default:
    //       return 'Something went wrong.';
    //   }
    // }

    // Handling email verification errors
    // if (error instanceof EmailNotVerifiedError) { --> Commented
    //   return error?.message;
    // }

    // Throwing other unexpected errors
    throw error;
  }
}

export const findUserByEmail = async (email: string) => {
  console.log("Your email id is : "+email);
  return await db.iq140_user.findFirst({
    where: {
      email,
    },
  });
};

// Defining the schema for sign-up form validation
// const signUpSchema = z.object({
//   name: z.string().min(3).max(255),
//   email: z.string().email(),
//   password: z.string().min(3).max(255),
// });

// // Interface for the sign-up form state
// interface SignUpFormState {
//   errors: {
//     name?: string[];
//     email?: string[];
//     password?: string[];
//     _form?: string[];
//   };
// }

// Sign-up function handling form validation and user creation
// export async function signUp(formState: SignUpFormState, formData: FormData){
//   // validate the sign up form
//   const result = signUpSchema.safeParse({
//     name: formData.get('name'),
//     email: formData.get('email'),
//     password: formData.get('password'),
//   });

  // returns a validation error if the payload does not match our validation rules
  // if (!result.success) {
  //   return {
  //     errors: result.error.flatten().fieldErrors,
  //   };
  // }

  // make sure the user does not enter a registered email
  // const isEmailExists = await findUserByEmail(result.data.email);
  // if (isEmailExists) {
  //   return {
  //     errors: {
  //       email: ['Email already exists'],
  //     },
  //   };
  // }

  // const hashed = await generatePasswordHash(result.data.password);

  // const verificationToken = generateEmailVerificationToken();

  // let user: User;                              --> Commented
  // try {
  //   // create user data
  //   user = await db.user.create({
  //     data: {
  //       name: result.data.name,
  //       email: result.data.email,
  //       password: hashed,
  //       emailVerifToken: verificationToken,
  //     },
  //   });
  // } catch (error: unknown) {
  //   // Handling database creation errors
  //   if (error instanceof Error) {
  //     return {
  //       errors: {
  //         _form: [error.message],
  //       },
  //     };
  //   } else {
  //     return {
  //       errors: {
  //         _form: ['Something went wrong'],
  //       },
  //     };
  //   }
  // }

  // Sending email verification
  // await sendVerificationEmail(result.data.email, verificationToken);       ---> Commented

  // Redirecting to the email verification page
  // redirect(`/email/verify/send?email=${result.data.email}&verification_sent=1`);
// }

// Function to handle user logout
export async function logout() {
  await signOut({redirect:false});
  redirect('/login');
}

// Function to find a user by email in the database


// Function to generate a hashed password
// const generatePasswordHash = async (password: string) => {
//   // generates a random salt. A salt is a random value used in the hashing process to ensure 
//   // that even if two users have the same password, their hashed passwords will be different. 
//   // The 10 in the function call represents the cost factor, which determines how much 
//   // computational work is needed to compute the hash.
//   const salt = await bcryptjs.genSalt(10);
//   return bcryptjs.hash(password, salt);
// };

// Function to generate an email verification token
// const generateEmailVerificationToken = () => {
  // generates a buffer containing 32 random bytes. 
  // The 32 indicates the number of bytes to generate, and it is commonly used 
  // for creating secure tokens or identifiers.
  // return randomBytes(32).toString('hex');
// };

// Function to send a verification email                                        --> Commented
// const sendVerificationEmail = async (email: string, token: string) => {
//   // nodemailer configuration. make sure to replace this with your native email provider in production.
//   // we will use mailtrap in this tutorial, so make sure you have the correct configuration in your .env
//   const transporter: nodemailer.Transporter = nodemailer.createTransport({
//     host: process.env.MAIL_HOST,
//     port: Number(process.env.EMAIL_PORT) || 0,
//     auth: {
//       user: process.env.MAIL_USERNAME,
//       pass: process.env.MAIL_PASSWORD,
//     },
//   });

//   // the content of the email
//   const emailData = {
//     from: '"Blog Nextjs Auth" <verification@test.com>',
//     to: email,
//     subject: 'Email Verification',
//     html: `
//       <p>Click the link below to verify your email:</p>
//       <a href="http://localhost:3000/email/verify?email=${email}&token=${token}">Verify Email</a>
//     `,
//   };

//   try {
//     // send the email
//     await transporter.sendMail(emailData);
//   } catch (error) {
//     console.error('Failed to send email:', error);
//     throw error;
//   }
// };

// Function to resend email verification
// export const resendVerificationEmail = async (email: string) => {              --> Commented
//   const emailVerificationToken = generateEmailVerificationToken();

//   try {
//     // update email verification token
//     await db.user.update({
//       where: { email },
//       data: { emailVerifToken: emailVerificationToken },
//     });

//     // send the verification link along with the token
//     await sendVerificationEmail(email, emailVerificationToken);
//   } catch (error) {
//     return 'Something went wrong.';
//   }

//   return 'Email verification sent.';
// };

// Function to verify a user's email
// export const verifyEmail = (email: string) => {      --> Commented
//   return db.user.update({
//     where: { email },
//     data: {
//       emailVerifiedAt: new Date(),
//       emailVerifToken: null,
//     },
//   });
// };

// Function to check if a user's email is verified
// export const isUsersEmailVerified = async (email: string) => {
//   const user = await db.user.findFirst({
//     where: { email },
//   });

//   // if the user doesn't exist then it's none of the function's business
//   if (!user) return true;

//   // if the emailVerifiedAt value is null then raise the EmailNotVerifiedError error
//   if (!user?.emailVerifiedAt) throw new EmailNotVerifiedError(`EMAIL_NOT_VERIFIED:${email}`);

//   return true;
// };


