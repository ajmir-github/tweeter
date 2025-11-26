import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { TRPCError, initTRPC } from "@trpc/server";

export const createContext = ({ req, res }: CreateExpressContextOptions) => {
  return {};
}; // no context
type Context = ReturnType<typeof createContext>;

type Meta = {
  authRequired?: boolean;
  roleRequired?: any[];
};

const trpcRoot = initTRPC.context<Context>().meta<Meta>().create();
export const router = trpcRoot.router;
export const procedure = trpcRoot.procedure.use(async (opts) => {
  const { ctx, meta } = opts;

  // Public procedure
  return opts.next();
});
