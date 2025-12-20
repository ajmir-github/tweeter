import { ZodError } from "zod";

export default function extractZodError(error: unknown): ZodError | null {
  if (error instanceof ZodError) return error;

  if (error && typeof error === "object" && "cause" in error) {
    return extractZodError((error as any).cause);
  }

  return null;
}
