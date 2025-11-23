import { Router } from "express";
import * as userService from "../services/userService";

export const userRouter = Router();

// GET /users
userRouter.get("/", async (_req, res) => {
  const users = await userService.listUsers();
  res.json(users);
});

// GET /users/:id
userRouter.get("/:id", async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// POST /users
userRouter.post("/", async (req, res) => {
  const newUser = await userService.createUser(req.body);
  res.status(201).json(newUser);
});

// PUT /users/:id
userRouter.put("/:id", async (req, res) => {
  const updated = await userService.updateUser(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "User not found" });
  res.json(updated);
});

// DELETE /users/:id (soft delete)
userRouter.delete("/:id", async (req, res) => {
  const deleted = await userService.deleteUser(req.params.id);
  if (!deleted) return res.status(404).json({ error: "User not found" });
  res.json(deleted);
});

// PATCH /users/:id/recover
userRouter.patch("/:id/recover", async (req, res) => {
  const recovered = await userService.recoverUser(req.params.id);
  if (!recovered) return res.status(404).json({ error: "User not found" });
  res.json(recovered);
});
