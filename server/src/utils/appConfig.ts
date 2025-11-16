import dotenv from "dotenv";
dotenv.config();

function validateEnv(name: string, defaultValue?: string) {
  const val = process.env[name];
  if (val) return val;
  if (!defaultValue)
    throw Error(`Missing required environment variable: ${name}`);
  return defaultValue;
}

export const ClientURL = validateEnv("CLIENT_URL");
export const Port = validateEnv("PORT", "3000");
