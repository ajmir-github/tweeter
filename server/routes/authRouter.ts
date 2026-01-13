import { TRPCError } from "@trpc/server";
import _ from "lodash";
import { v7 as uuid } from "uuid";
import z from "zod";
import { publicProcedure, router } from "../trpc";
import { signToken, verifyToken } from "../utils/encryptions";
import { throwCustomZodError } from "../utils/zodError";

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  avatar?: string;
}
const User: User[] = [
  {
    id: "1",
    email: "ajmir@gmail.com",
    password: "123456",
    name: "Ajmir Raziqi",
  },
];

export default router({
  login: publicProcedure
    .input(
      z.object({
        email: z.email(),
        password: z.string().min(6),
      })
    )
    .mutation(({ input }) => {
      const user = User.find((user) => user.email === input.email);
      if (!user)
        throwCustomZodError({ path: "email", message: "Email not found!" });
      if (user.password !== input.password)
        throwCustomZodError({
          path: "password",
          message: "Password not matched!",
        });
      const token = signToken({ id: user.id });
      return {
        user,
        token,
      };
    }),
  register: publicProcedure
    .input(
      z.object({
        name: z.string().min(3),
        email: z.email(),
        password: z.string().min(6),
      })
    )
    .mutation(({ input }) => {
      const user = {
        id: uuid(),
        ...input,
      };
      const userWithSameEmail = User.findIndex(
        (tUser) => tUser.email === user.email
      );
      if (userWithSameEmail !== -1)
        throwCustomZodError({ path: "email", message: "Email already used!" });
      User.push(user);

      const token = signToken({ id: user.id });
      return {
        user: _.omit(user, ["password"]),
        token,
      };
    }),
  update: publicProcedure
    .input(
      z.object({
        email: z.email(),
        password: z.string().min(6),
      })
    )
    .mutation(() => 1),
  self: publicProcedure.query(({ ctx: { token } }) => {
    if (!token) throw new TRPCError({ code: "UNAUTHORIZED" });
    const { id } = verifyToken(token);
    const user = User.find((user) => user.id === id);
    if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });
    return user;
  }),
});
