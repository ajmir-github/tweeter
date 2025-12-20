import { type CreateExpressContextOptions } from "@trpc/server/adapters/express";
import * as libs from "../libs";
import { database } from "../prisma";

export function createContext({ req, res }: CreateExpressContextOptions) {
  return {
    req,
    res,
    database,
    libs,
  };
}

export type Context = ReturnType<typeof createContext>;
