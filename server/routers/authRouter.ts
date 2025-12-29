import express from "express";
import z, { ZodError } from "zod";
import { AuthOptionalContext, AuthRequiredContext } from "../context";
import { database, User } from "../prisma";
import { comparePassword, hashPassword, signToken } from "../utils/encryptions";
import { ServerError } from "../utils/expressContext";

const authRouter = express.Router();

const hidePassword = ({ password, ...rest }: User) => rest;

// get auth
authRouter.get(
  "/",
  AuthRequiredContext.handle(({ auth }) => {
    return hidePassword(auth);
  })
);

const PublicOnlyContext = AuthOptionalContext.use((context) => {
  if (context.auth) throw new ServerError("You are already signed in!");
});

// sign in
authRouter.post(
  "/signin",
  PublicOnlyContext.handle(async (_context, request) => {
    // validate inputs
    const { email, password } = z
      .object({
        email: z.email(),
        password: z.string().min(6),
      })
      .parse(request.body);
    // find user
    const user = await database.user.findFirst({
      where: {
        email,
      },
    });

    if (!user)
      throw new ZodError([
        { code: "custom", path: ["email"], message: "Email does not exist!" },
      ]);

    // match password
    const passwordMatched = await comparePassword(password, user.password);
    if (!passwordMatched)
      return new ZodError([
        {
          code: "custom",
          path: ["password"],
          message: "Password does not match!",
        },
      ]);

    // sign token
    const token = signToken({
      id: user.id,
    });

    // success
    return { auth: hidePassword(user), token };
  })
);

// sign up
authRouter.post(
  "/signup",
  PublicOnlyContext.handle(async (_context, request) => {
    // validate inputs
    const inputs = await z
      .object({
        name: z.string().min(3),
        email: z
          .email()
          .refine(
            async (email) =>
              !(await database.user.findFirst({ where: { email } })),
            {
              error: "This email is already used!",
            }
          ),
        password: z
          .string()
          .min(6)
          .transform((password) => hashPassword(password)),
      })
      .parseAsync(request.body);
    // create user
    const user = await database.user.create({
      data: inputs,
    });

    // sign token
    const token = signToken({
      id: user.id,
    });

    return { auth: hidePassword(user), token };
  })
);

export default authRouter;
