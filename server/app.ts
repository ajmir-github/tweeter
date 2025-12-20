import cors from "cors";
import Express from "express";
import { ClientURL, PublicDirectory } from "./constants";
import { appHandler } from "./trpc";

const app = Express();
// app config
app.use(
  cors({
    origin: ClientURL,
  })
);

app.use("/public", Express.static(PublicDirectory));
app.use("/trpc", appHandler);

export default app;
