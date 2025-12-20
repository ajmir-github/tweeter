import { ZodError } from "zod";

export default function formateZodError(zodError: ZodError) {
  return zodError.issues.map(({ path, message, code }) => ({
    path,
    message,
    code,
  }));
}
