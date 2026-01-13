import { initTRPC } from "@trpc/server";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import SuperJSON from "superjson";
import { ZodError } from "zod";

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

  errorFormatter(opts) {
    const { shape, error } = opts;
    // if zod error
    if (error.cause instanceof ZodError) {
      return {
        ...shape,
        data: {
          issues: error.cause.issues,
        },
      };
    }
    // else
    return shape;
  },
});

export const router = trpc.router;
export const publicProcedure = trpc.procedure;
