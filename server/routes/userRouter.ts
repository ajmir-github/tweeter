import { publicProcedure, router } from "../trpc";

export default router({
  listUsers: publicProcedure.query(({ ctx }) => {
    return {
      list: [1, 2, 3],
      ctx,
    };
  }),
});
