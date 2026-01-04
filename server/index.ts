import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cli from "cli-color";
import cors from "cors";
import express from "express";
import appRouter from "./appRouter";
import { ClientURL, Port, PublicDirectory } from "./constants";
import { createContext } from "./trpc";
const app = express();
// app config
app.use(
  cors({
    origin: ClientURL,
  })
);

// registering routes
app.use("/public", express.static(PublicDirectory));

// 404 handler
app.use("/public", (req, res) =>
  res.status(404).json({ message: "File/URL not found!" })
);

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// app listener
app.listen(Port, () =>
  console.log(cli.green(`Server is running on port: ${Port}`))
);

type AppRouter = typeof appRouter;
export default AppRouter;
