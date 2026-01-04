import { initTRPC } from "@trpc/server";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import SuperJSON from "superjson";

export const createContext = (opts: CreateExpressContextOptions) => {
  const { authorization } = opts.req.headers;
  const token = authorization ? authorization.replace("Bearer ", "") : null;
  return {
    token,
  };
};

export type Context = ReturnType<typeof createContext>;

export const trpc = initTRPC.context<Context>().create({
  transformer: SuperJSON,
});

export const router = trpc.router;
export const publicProcedure = trpc.procedure;
