import { Router } from "express";
import { authService, userService } from "../services";

export const authRouter = Router();

// POST /auth/register
authRouter.post("/register", async (req, res) => {
  const { email, password, name, phone } = req.body;

  const existing = await userService.getUserByEmail(email);
  if (existing) return res.status(400).json({ error: "Email already in use" });

  const hashed = await authService.hashPassword(password);
  const user = await userService.createUser({
    email,
    password: hashed,
    name,
    phone,
  });

  const token = authService.generateToken(user);
  res.status(201).json({ user, token });
});

// POST /auth/login
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.getUserByEmail(email);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await authService.comparePassword(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = authService.generateToken(user);
  res.json({ user, token });
});
