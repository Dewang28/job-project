import { PrismaClient } from "@prisma/client";

/**
 * Create a single Prisma instance
 * Prevents multiple connections during dev (nodemon)
 */
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

/**
 * Optional connection test
 * Call this once when server starts
 */
export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("✅ PostgreSQL connected via Prisma");
  } catch (error) {
    console.error("❌ Database connection failed", error);
    process.exit(1);
  }
};

export default prisma;
