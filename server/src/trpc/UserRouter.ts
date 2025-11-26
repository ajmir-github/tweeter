import { procedure, router } from "./core";

// auth and user
const UserRouter = router({
  test: procedure.query(async (a) => {
    return [1, 2];
  }),
});

export default UserRouter;
