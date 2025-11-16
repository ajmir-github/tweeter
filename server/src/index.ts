import express from "express";
import { Profile, Types } from "./model";
import { Port } from "./utils/appConfig";
const app = express();

app.get("/", async (request, response) => {
  const profiles = await Profile.findMany();
  response.json(profiles);
});

app.get("/create", async (request, response) => {
  try {
    await Profile.create({
      data: {
        name: "AJ",
      },
    });
    response.send("Created!");
  } catch (error) {
    response.send(error);
  }
});

app.listen(Port, () => {
  return console.log(`Express is listening at http://localhost:${Port}`);
});
