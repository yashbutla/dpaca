// src/lib/db.ts
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

// Ensure database instance is clean and reused during HMR in development
if (process.env.NODE_ENV === 'production') {
  const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
  prisma = new PrismaClient({ adapter });
} else {
  if (!global.prisma) {
    const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
    global.prisma = new PrismaClient({ adapter });
  }
  prisma = global.prisma;
}

export default prisma;
export { prisma };
