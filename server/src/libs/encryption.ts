import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { JWTSecretKey } from "../constants";

export const signToken = (id: string, role: any) =>
  jwt.sign({ id, role }, JWTSecretKey, {
    expiresIn: "45d",
  });

export const verifyToken = (token: string) =>
  jwt.verify(token, JWTSecretKey) as { id: string; role: any };

export const hashPassword = (password: string) =>
  bcryptjs.hashSync(password, 10);
export const comparePassword = (password: string, hash: string) =>
  bcryptjs.compareSync(password, hash);
