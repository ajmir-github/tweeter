import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { SecretKey } from "../constants";
import { ServerError, StatusCodes } from "./expressContext";

type JWTPayload = { id: string };
const Options: jwt.SignOptions = {
  expiresIn: "45d",
};
const Salt = bcryptjs.genSaltSync(10);

export const signToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, SecretKey, Options);
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SecretKey) as JWTPayload;
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

export const hashPassword = async (password: string) => {
  return await bcryptjs.hash(password, Salt);
};
export const comparePassword = async (password: string, hash: string) => {
  return await bcryptjs.compare(password, hash);
};
