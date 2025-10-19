import { PrismaClient } from "../lib/generated/prisma";

const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
