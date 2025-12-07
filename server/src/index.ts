import cors from "cors";
import express from "express";
import { CorsOption, Port, ProjectDirectory } from "./constants";
import { prisma } from "./database";
import trpcApp from "./trpcApp";
export { type AppRouter } from "./trpcApp";

const app = express();

app.use(cors(CorsOption)); // cors for the whole application

app.use(express.urlencoded({ extended: true }));
app.use("/trpc", trpcApp);
app.use("/public", express.static(ProjectDirectory));
app.use("/api", express.json());
app.use("/api/user", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});
app.use("/api/tweet", async (req, res) => {
  try {
    const tweets = await prisma.tweet.findMany();
    res.json(tweets);
  } catch (error) {
    res.json(error);
  }
});
app.use("/api/media", async (req, res) => {
  try {
    const medias = await prisma.media.findMany();
    res.json(medias);
  } catch (error) {
    res.json(error);
  }
});
app.use("/api/like", async (req, res) => {
  try {
    const likes = await prisma.like.findMany();
    res.json(likes);
  } catch (error) {
    res.json(error);
  }
});
app.use("/api/follower", async (req, res) => {
  try {
    const followers = await prisma.follower.findMany();
    res.json(followers);
  } catch (error) {
    res.json(error);
  }
});
app.use("/api/notification", async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany();
    res.json(notifications);
  } catch (error) {
    res.json(error);
  }
});
app.listen(Port, () => console.log(`Server is running on port: ${Port}`));
