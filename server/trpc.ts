import { initTRPC } from "@trpc/server";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import SuperJSON from "superjson";
import { prettifyError, ZodError } from "zod";

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
    if (error.cause instanceof ZodError)
      return {
        ...shape,
        message: prettifyError(error.cause), // prettify => error.message
        data: {
          ...shape.data,
          errors: error.cause.issues, // simplify the error => error.data.errors
        },
      };
    // else
    return shape;
  },
});

export const router = trpc.router;
export const publicProcedure = trpc.procedure;
