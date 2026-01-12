import authRouter from "./routes/authRouter";
import { router } from "./trpc";

export default router({
  auth: authRouter,
});
