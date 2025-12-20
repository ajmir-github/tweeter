import { TRPCError } from "@trpc/server";
import z from "zod";

export function createZodError(
  path: string | (string | number)[],
  message: string
) {
  return new z.ZodError([
    {
      code: "custom",
      path: Array.isArray(path) ? path : [path],
      message,
    },
  ]);
}

export function createZodTrpcError(
  path: string | (string | number)[],
  message: string
) {
  // create zod error
  const zodError = createZodError(path, message);
  // inject it into the TrpcError
  return new TRPCError({
    code: "BAD_REQUEST",
    message: "Invalid inputs",
    cause: zodError,
  });
}

export default function formatZodError(zodError: z.ZodError) {
  return zodError.issues.map(({ path, message, code }) => ({
    path,
    message,
    code,
  }));
}

function extractZodError(error: unknown): z.ZodError | null {
  if (error instanceof z.ZodError) return error;

  if (error && typeof error === "object" && "cause" in error) {
    return extractZodError((error as any).cause);
  }

  return null;
}

export function extractZodErrorFormTrcpError(error: TRPCError) {
  return extractZodError(error.cause);
}
