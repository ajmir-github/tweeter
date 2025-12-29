import express from "express";
import { HandleErrors } from "../utils/expressContext";
import authRouter from "./authRouter";
import notificationRouter from "./notificationRouter";
import tweetRouter from "./tweetRouter";
import userRouter from "./userRouter";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/tweet", tweetRouter);
router.use("/notification", notificationRouter);
router.use(HandleErrors);

export default router;
