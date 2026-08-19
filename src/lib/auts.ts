import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../generated/prisma/client";
import dotenv from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";

dotenv.config();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

// trustedOrigins এর টাইপ সেফটি
const trustedOrigins = [
  "https://restauranthub-lovat.vercel.app",
  process.env.CLIENT_URL || "http://localhost:5173",
];

export const auth = betterAuth({
  // Backend Render URL উল্লেখ করা প্রয়োজন
  baseURL: process.env.BETTER_AUTH_URL,

  trustedOrigins,

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
  },

  advanced: {
    // Vercel এবং Render ভিন্ন ডোমেইন হওয়ায় crossSubdomainCookies বন্ধ রাখতে হবে
    crossSubdomainCookies: {
      enabled: false,
    },
    defaultCookieAttributes: {
      sameSite: "none", // Cross-site request-এর জন্য আবশ্যক
      secure: true, // HTTPS-এ true হতে হবে
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "customer",
      },
    },
  },
});
