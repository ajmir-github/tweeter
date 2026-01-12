import _ from "lodash";
import { v7 as uuid } from "uuid";
import z from "zod";
import { publicProcedure, router } from "../trpc";
import { signToken } from "../utils/encryptions";

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
    password: "132465",
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
    .mutation((opts) => null),
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
      User.push(user);
      z.object({
        email: z
          .email()
          .refine((email) => User.findIndex((user) => user.email === email), {
            message: "This email is already used!",
          }),
      }).parse(user);
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
  self: publicProcedure.query((opts) => null),
});
