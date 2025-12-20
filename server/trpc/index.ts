import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { createContext } from "./context";
import { procedure, router } from "./trpc";

export const appRouter = router({
  test: procedure.query(() => {
    return { message: "Hello from tRPC!" };
  }),
});

export const appHandler = createExpressMiddleware({
  router: appRouter,
  createContext,
});

export type AppRouter = typeof appRouter;
