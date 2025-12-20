import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import "dotenv/config";
import { PrismaClient } from "./generated/client";
export * from "./generated/client";

const connectionString = process.env.DATABASE_URL ?? "file:./prisma/dev.db";

const adapter = new PrismaBetterSqlite3({ url: connectionString });
const database = new PrismaClient({ adapter });

export { database };
