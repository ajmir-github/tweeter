import { PrismaClient } from "./prisma/client";
export type * as Types from "./prisma/client";

const database = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export const Profile = database.profile;
