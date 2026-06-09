import { PrismaClient } from "@prisma/client";

/**
 * Prisma client singleton.
 *
 * In development, Next.js hot-reload can create many PrismaClient instances and
 * exhaust the database connection pool. We cache a single instance on
 * `globalThis` to avoid that. In production a fresh instance is created once.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
