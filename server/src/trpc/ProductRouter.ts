import { procedure, router } from "./core";

// product and review
const ProductRouter = router({
  test: procedure.query(() => {
    return [1, 2];
  }),
});

export default ProductRouter;
