import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

type Meta = {
  authRequired?: boolean;
  roleRequired?: any[];
};

export const trpcRoot = initTRPC.context<any>().meta<Meta>().create({
  transformer: superjson,
});
export const router = trpcRoot.router;
export const procedure = trpcRoot.procedure.use(async (opts) => {
  // Public procedure
  return opts.next();
});
