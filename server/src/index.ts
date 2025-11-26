import express from "express";
import cors from "cors";
import { CorsOption, Port, ProjectDirectory } from "./constants";
import { trpcApp, appRouter } from "./trpcApp";

const app = express();

app.use(cors(CorsOption)); // cors for the whole application

app.use("/trpc", trpcApp);
app.use("/public", express.static(ProjectDirectory));
app.use("/express", express.urlencoded({ extended: true }));
app.use("/express", express.json());
// app.use("/api", ExpressAppRouter)
app.listen(Port, () => console.log(`Server is running on port: ${Port}`));

export type AppRouter = typeof appRouter;
