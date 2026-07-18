//"This file creates and reuses a single database connection so your app talks to the database efficiently


import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], // optional: helps during debugging
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
