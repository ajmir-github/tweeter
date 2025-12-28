import "dotenv/config";
import path from "path";
export { StatusCodes } from "http-status-codes";

export const ProjectDirectory = process.cwd();
export const PublicDirectory = path.join(ProjectDirectory, "public");
export const PORT = process.env.PORT ?? "4001";
export const ClientURL = process.env.CLIENT_URL ?? "*";
export const TokenSecretKey = process.env.TOKEN_SECRET_KEY ?? "SOME";
export const TokenLifetime = process.env.TOKEN_LIFETIME ?? "1h";
