import express from "express";
import { Port } from "./utils/appConfig";
import { createUser, listUsers } from "./services/UserServices";
const app = express();

app.get("/", async (request, response) => {
  const users = await listUsers();
  response.send(users);
});

app.get("/create", async (request, response) => {
  const newUser = await createUser({});
});

app.listen(Port, () => {
  return console.log(`Express is listening at http://localhost:${Port}`);
});
