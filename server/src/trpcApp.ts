import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { createContext } from "./context";
import { router } from "./handlers";

export const appRouter = router({});

export const trpcApp = createExpressMiddleware({
  router: appRouter,
  createContext,
});
