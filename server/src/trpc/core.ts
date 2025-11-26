import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { Context } from ".";

type Meta = {
  authRequired?: boolean;
  roleRequired?: any[];
};

export const trpcRoot = initTRPC.context<Context>().meta<Meta>().create({
  transformer: superjson,
});
export const router = trpcRoot.router;
export const procedure = trpcRoot.procedure;
