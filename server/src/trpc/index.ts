import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import UserRouter from "./UserRouter";
import ProductRouter from "./ProductRouter";
import AuthRouter from "./AuthRouter";
import ReviewRouter from "./ReviewRouter";
import OrderRouter from "./OrderRouter";
import OrderItemRouter from "./OrderItemRouter";
import * as encryption from "../libs/encryption";
import * as Database from "../models";

const createContext = ({ req, res }: CreateExpressContextOptions) => {
  return {
    encryption,
    Database,
  };
}; // no context
type Context = ReturnType<typeof createContext>;

type Meta = {
  authRequired?: boolean;
  roleRequired?: any[];
};

export const trpcRoot = initTRPC.context<Context>().meta<Meta>().create({
  transformer: superjson,
});
export const router = trpcRoot.router;
export const procedure = trpcRoot.procedure;

export const appRouter = router({
  auth: AuthRouter,
  user: UserRouter,
  product: ProductRouter,
  review: ReviewRouter,
  order: OrderRouter,
  OrderItemRouter,
});

export const trpcApp = createExpressMiddleware({
  router: appRouter,
  createContext,
});
