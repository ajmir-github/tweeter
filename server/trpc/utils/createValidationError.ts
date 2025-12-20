import { TRPCError } from "@trpc/server";
import z from "zod";

export function createValidationError(
  path: string | (string | number)[],
  message: string
) {
  const zodError = new z.ZodError([
    {
      code: "custom",
      path: Array.isArray(path) ? path : [path],
      message,
    },
  ]);

  return new TRPCError({
    code: "BAD_REQUEST",
    message: "Invalid inputs",
    cause: zodError,
  });
}
