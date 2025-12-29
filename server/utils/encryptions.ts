import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { SecretKey, StatusCodes } from "../constants";
import { ServerError } from "./expressContext";

type JWTPayload = { id: string };
const Options: jwt.SignOptions = {
  expiresIn: "1h",
};
const Salt = bcryptjs.genSaltSync(10);

export const signToken = (payload: JWTPayload): string => {
  try {
    return jwt.sign(payload, SecretKey, Options);
  } catch (error) {
    if (error instanceof jwt.NotBeforeError) {
      throw new ServerError(
        "Token is not active yet",
        StatusCodes.UNAUTHORIZED
      );
    } else if (error instanceof jwt.TokenExpiredError) {
      throw new ServerError("Token has expired", StatusCodes.UNAUTHORIZED);
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new ServerError("Invalid Token", StatusCodes.UNAUTHORIZED);
    }
    throw ServerError.from(error);
  }
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SecretKey) as JWTPayload;
};

export const hashPassword = async (password: string) => {
  return await bcryptjs.hash(password, Salt);
};
export const comparePassword = async (password: string, hash: string) => {
  return await bcryptjs.compare(password, hash);
};
