import "dotenv/config";
import path from "path";
import z from "zod";

export const ProjectDirectory = process.cwd();
export const PublicDirectory = path.join(ProjectDirectory, "public");
export const Port = z
  .string()
  .length(4)
  .default("3001")
  .parse(process.env.PORT);
export const ClientURL = z.url().default("*").parse(process.env.CLIENT_URL);
export const SecretKey = z
  .string()
  .default("SOME")
  .parse(process.env.SECRET_KEY);
