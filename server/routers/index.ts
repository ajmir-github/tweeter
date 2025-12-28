import express from "express";
import authRouter from "./authRouter";
import notificationRouter from "./notificationRouter";
import tweetRouter from "./tweetRouter";
import userRouter from "./userRouter";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/tweet", tweetRouter);
router.use("/notification", notificationRouter);
router.use(
  (
    error: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }

    if ("status" in error && "error" in error) {
      return res.status(error.status).json({ error: error.error });
    }

    console.log(error);
    return res.status(500).json({
      error: {
        message: "An unknown error occurred.",
      },
    });
  }
);

export default router;
