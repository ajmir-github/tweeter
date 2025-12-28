import cli from "cli-color";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { ClientURL, PublicDirectory, StatusCodes } from "./constants";
import router from "./routers";
const app = express();
// app config
app.use(
  cors({
    origin: ClientURL,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// registering routes
app.use("/public", express.static(PublicDirectory));
app.use("/api", router);

// 404 handler
app.use((req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: "Url not found!" });
});
// global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(cli.red(error));
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: error.message });
});

export default app;
