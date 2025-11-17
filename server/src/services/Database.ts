import { PrismaClient } from "../prisma/client";
export type * as Types from "../prisma/client";

export const Database = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});
