import { procedure, router } from "./core";

const CategoryRouter = router({
  test: procedure.query(() => {
    return [1, 2];
  }),
});

export default CategoryRouter;
