import type { ReactNode } from "react";
import {
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";

export function InputField<T extends FieldValues>({
  label,
  name,
  form: { register, formState },
}: {
  label: string;
  name: Path<T>;
  form: UseFormReturn<T>;
}) {
  const errorMessage = formState.errors[name]?.message?.toString();
  return (
    <div className="grid gap-2">
      <div className="font-semibold text-sm">{label}</div>
      <input
        className="rounded-2xl px-4 py-2 border outline-none  duration-400"
        {...register(name)}
      />
      {errorMessage && (
        <div className="text-red-500 text-xs">{errorMessage}</div>
      )}
    </div>
  );
}

export function SubmitButton({
  children,
  form: { formState },
}: {
  children: ReactNode;
  form: UseFormReturn<any>;
}) {
  return (
    <div className="grid gap-2">
      <button
        className="bg-pink-500 rounded-2xl px-4 py-2 text-white hover:bg-pink-600 duration-200"
        type="submit"
      >
        {children}
      </button>
      {formState.errors.root && (
        <div className="text-red-500 text-xs">
          {formState.errors.root.message?.toString()}
        </div>
      )}
    </div>
  );
}
