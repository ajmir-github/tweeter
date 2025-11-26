import z from "zod";
import { procedure, router } from "./core";

// auth and user
const AuthRouter = router({
  login: procedure
    .input(z.object({}))
    .mutation(async ({ input, ctx: { Database, encryption } }) => {
      return false;
    }),
});

export default AuthRouter;
