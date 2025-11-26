import { createExpressMiddleware } from "@trpc/server/adapters/express";
import UserRouter from "./UserRouter";
import ProductRouter from "./ProductRouter";
import AuthRouter from "./AuthRouter";
import ReviewRouter from "./ReviewRouter";
import OrderRouter from "./OrderRouter";
import OrderItemRouter from "./OrderItemRouter";
import * as encryption from "../libs/encryption";
import * as Database from "../models";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { router } from "./core";

const createContext = ({ req, res }: CreateExpressContextOptions) => {
  return {
    encryption,
    Database,
  };
}; // no context
export type Context = ReturnType<typeof createContext>;

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
