import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Database, { User } from "../models";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"; // use env var in production

// Hash password
export const hashPassword = async (plain: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
};

// Compare password
export const comparePassword = async (plain: string, hashed: string) => {
  return bcrypt.compare(plain, hashed);
};

// Generate JWT
export const generateToken = (user: User) => {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Verify JWT
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};
