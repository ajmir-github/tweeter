import { TRPCError } from "@trpc/server";
import z from "zod";
import { comparePassword, hashPassword } from "../libs/bcryptjs";
import { signToken } from "../libs/jwt";
import {
  authenticatedOnlyClient,
  unauthenticatedOnlyProcedure,
} from "../trpcProcedure";
import { createValidationError } from "../utils/createValidationError";

export const getAuth = authenticatedOnlyClient.query(({ ctx }) => {
  return ctx.auth;
});

export const signIn = unauthenticatedOnlyProcedure
  .input(
    z.object({
      email: z.email(),
      password: z.string().min(6),
    })
  )
  .mutation(async ({ input: { email, password }, ctx: { database } }) => {
    // find the user

    const user = await database.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw createValidationError("email", "Email does not exist!");

    // match password

    const matched = comparePassword(password, user.password);

    if (!matched)
      throw createValidationError("password", "Password does not match!");

    // sign token
    const token = signToken(user.id);

    return {
      token,
      user,
    };
  });

export const signUp = unauthenticatedOnlyProcedure
  .input(
    z.object({
      name: z.string().min(3),
      email: z.email(),
      password: z.string().min(6),
    })
  )
  .mutation(async ({ input, ctx: { database } }) => {
    // check if email is used
    const emailAlreadyExist = await database.user.findUnique({
      where: {
        email: input.email,
      },
    });
    if (emailAlreadyExist)
      throw new TRPCError({
        code: "CONFLICT",
        message: "This email is already used!",
      });

    // hash password
    const password = hashPassword(input.password);

    console.log({ password });
    // save the user
    const user = await database.user.create({
      data: {
        ...input,
        password,
      },
    });

    // create token
    const token = signToken(user.id);

    // send it to the client
    return {
      user,
      token,
    };
  });
