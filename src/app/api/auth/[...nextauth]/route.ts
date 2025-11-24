import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

// Create a reusable Ethereal test account and transporter
const testAccount = await nodemailer.createTestAccount();

console.log("Ethereal account info (for testing only):");
console.log(`User: ${testAccount.user}`);
console.log(`Pass: ${testAccount.pass}`);

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      },
      from: "GoalPredict <no-reply@example.com>",
      // Override to log the actual magic link in the terminal
      async sendVerificationRequest({ identifier, url }) {
        console.log(`Magic link for ${identifier}: ${url}`);
      },
    }),
  ],
  session: {
    strategy: "database",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
