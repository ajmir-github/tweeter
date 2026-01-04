import userController from "./controllers/userController";
import { publicProcedure, router } from "./trpc";

export default router({
  test: publicProcedure.query(() => {
    return { msg: "GOOD" };
  }),
  user: userController,
});
