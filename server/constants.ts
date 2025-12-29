import "dotenv/config";
import path from "path";
export { StatusCodes } from "http-status-codes";

export const ProjectDirectory = process.cwd();
export const PublicDirectory = path.join(ProjectDirectory, "public");
export const PORT = process.env.PORT ?? "4001";
export const ClientURL = process.env.CLIENT_URL ?? "*";
export const SecretKey = process.env.SECRET_KEY ?? "SOME";
