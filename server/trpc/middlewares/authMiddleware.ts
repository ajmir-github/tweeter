import { TRPCError } from "@trpc/server";
import { middleware } from "../trpc";

export const authOptionalMiddleware = middleware(async ({ ctx, next }) => {
  // get token
  const { authorization } = ctx.req.headers;
  if (!authorization)
    return next({
      ctx: {
        user: null,
      },
    });
  const token = authorization.split(" ")[1]; // Bearer xxx

  // decode token
  const { userId } = ctx.libs.tokenEncryptor.verify(token);

  // find user
  const user = await ctx.database.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user)
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "User does not exist anymore!",
    });

  // pass the user
  return next({ ctx: { user } });
});

export const authRequiredMiddleware = middleware(async ({ ctx, next }) => {
  // get token
  const { authorization } = ctx.req.headers;
  if (!authorization)
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You are lack authetication",
    });
  const token = authorization.split(" ")[1]; // Bearer xxx

  // decode token
  const { userId } = ctx.libs.tokenEncryptor.verify(token);

  // find user
  const user = await ctx.database.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user)
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "User does not exist anymore!",
    });

  // pass the user
  return next({ ctx: { user } });
});
