import { Server } from "@/services";
import { useAppDispatch } from "@/state";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCClientError } from "@trpc/client";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import {
  useForm,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";
import { Link } from "react-router";
import z from "zod";

const inputValidator = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(6),
});

type Inputs = z.output<typeof inputValidator>;

function InputField<T extends FieldValues>({
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

function SubmitButton({
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
export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const form = useForm<Inputs>({ resolver: zodResolver(inputValidator) });
  const onSubmit = async (inputs: Inputs) =>
    Server.auth.register
      .mutate(inputs)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err instanceof TRPCClientError && err.data.errors) {
          (err.data.errors as z.core.$ZodIssue[]).forEach(
            ({ path, message }) => {
              form.setError(path.join(".") as any, { message });
            }
          );
        }
        return err;
      });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold uppercase">Sign up here!</h1>
      <form className="gap-4 grid" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <InputField label="Name" form={form} name="name" />
          <InputField label="Email" form={form} name="email" />
          <InputField label="Password" form={form} name="password" />
        </div>
        <SubmitButton form={form}>Login</SubmitButton>
      </form>

      <Link
        to={"/login"}
        className="hover:text-pink-500 flex justify-between items-center"
      >
        <span className="italic">Create an account</span>
        <ArrowRight />
      </Link>
    </div>
  );
}
