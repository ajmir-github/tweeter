import { procedure, router } from "./core";

// auth and user
const ReviewRouter = router({
  test: procedure.query(() => {
    return [1, 2];
  }),
});

export default ReviewRouter;
