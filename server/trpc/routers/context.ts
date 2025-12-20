import { Request } from "express";
import { createProcedure } from "../libs/Procedure";
import { verifyToken } from "../libs/jwt";
import { database } from "../prisma";

export const publicProcedure = createProcedure((request: Request) => {
  return {
    database,
  };
});
export const privateProcedure = publicProcedure.next(
  async ({ database }, request) => {
    const { authorization } = request.headers;
    if (!authorization) throw new Error("Auth Required!");
    const token = authorization.split(" ")[1];
    const { userId } = verifyToken(token);
    const user = database.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new Error("User Does not exists");
    return { auth: user };
  }
);
