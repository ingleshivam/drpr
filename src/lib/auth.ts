//auth.ts
// import { findUserByEmail } from "@/actions/auth";
import { db } from "@/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from 'bcryptjs'

async function getUser(email:string) {
    try {
        const getUser =  await db.iq140_user.findFirst({
            where: {
              email,
            },
          });

        return getUser;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}


export const authOptions:NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session:{
        strategy:'jwt'
    },
    pages:{
        signIn: '/login',
    },
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "email", type: "text" },
            password: { label: "password", type: "text" }
          },
          async authorize(credentials, req) {
            const parsedCredentials = z
            .object({ email: z.string(), password: z.string() })
            .safeParse(credentials);

            if (parsedCredentials.success) {
                const { email, password } = parsedCredentials.data;
                const user = await getUser(email);
                console.log("This is user code : "+user)
                
                // If user exists, compare hashed passwords
                if (!user) return null;
                const passwordsMatch = await bcrypt.compare(password, user.password);
                console.log(passwordsMatch);

                // If passwords match, return the user
                if (passwordsMatch) return user;
            }
          }
        })
      ]
}