import { TRPCError } from "@trpc/server";
import { ZodError, ZodRealError } from "zod";

export function throwZodError(zodError: ZodError<any>): never {
  throw new TRPCError({
    code: "BAD_REQUEST",
    cause: zodError,
  });
}
export function throwCustomZodError({
  message,
  path,
}: {
  path: string;
  message: string;
}): never {
  throwZodError(
    new ZodRealError([
      {
        code: "custom",
        message,
        path: [path],
      },
    ])
  );
}
