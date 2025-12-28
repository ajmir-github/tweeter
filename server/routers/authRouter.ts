import express from "express";
import z from "zod";
import { database } from "../prisma";
import { validateBody } from "../utils/validator";

const authRouter = express.Router();

// get auth
authRouter.get("/", () => {});

// sign in
authRouter.post("/signin", async (req, res) => {
  // validate
  const body = await validateBody(
    req,
    z.object({
      email: z.email(),
      password: z.string().min(6),
    })
  );
  // find user and verify password
  const user = await database.user.findUnique({
    where: { email: body.email },
  });

  // done
});

// sign up
authRouter.post("/signup", () => {});

export default authRouter;
