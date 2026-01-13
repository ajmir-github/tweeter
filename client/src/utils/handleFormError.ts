import { isTRPCClientError } from "@trpc/client";
import type { UseFormReturn } from "react-hook-form";
import type z from "zod";

export default function handleFormError(form: UseFormReturn<any>) {
  return (err: any) => {
    if (!isTRPCClientError(err)) throw err;
    const issues: z.core.$ZodIssue[] = err.data.issues ?? [];
    for (const { path, message } of issues)
      form.setError(path.join(".") as any, { message }, { shouldFocus: true });
  };
}
