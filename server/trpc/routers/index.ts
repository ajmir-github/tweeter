import Express from "express";
import z from "zod";
import { validateBody } from "../helpers";
import { publicProcedure } from "./context";

const apiRouter = Express.Router();

apiRouter.post("/user", async (request, response) => {
  const result = await publicProcedure
    .next(validateBody(z.object({ name: z.string() })))
    .handle(({ body }) => {
      return {
        message: "Good",
        inputs: body,
      };
    })(request);

  response.json(result);
});

export default apiRouter;
