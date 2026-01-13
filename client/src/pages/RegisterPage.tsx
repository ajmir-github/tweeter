import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Server } from "@/services";
import { useAppDispatch } from "@/state";
import authSlice from "@/state/authSlice";
import handleFormError from "@/utils/handleFormError";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
import z from "zod";

const inputValidator = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(6),
});

type Inputs = z.output<typeof inputValidator>;

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const form = useForm<Inputs>({ resolver: zodResolver(inputValidator) });
  const onSubmit = async (inputs: Inputs) =>
    Server.auth.register
      .mutate(inputs)
      .then((res) => {
        dispatch(authSlice.actions.signIn(res));
        toast(`${res.user.name}, your account is created!`);
      })
      .catch(handleFormError(form))
      .catch((e) => console.error(e.data));

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold uppercase">Create a new account!</h1>
      <form className="gap-4 grid" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input id="name" type="text" {...form.register("name")} />
              <FieldError>
                {form.formState.errors.name?.message?.toString()}
              </FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="text" {...form.register("email")} />
              <FieldError>
                {form.formState.errors.email?.message?.toString()}
              </FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>

              <Input
                id="password"
                type="password"
                {...form.register("password")}
              />
              <FieldError>
                {form.formState.errors.password?.message?.toString()}
              </FieldError>
            </Field>
            <Field>
              <Button type="submit">
                <PlusIcon />
                Login
              </Button>
              <FieldError>
                {form.formState.errors.root?.message?.toString()}
              </FieldError>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>

      <Button asChild variant={"link"}>
        <Link to={"/login"}>
          <span className="italic">login to yours existing account</span>
        </Link>
      </Button>
    </div>
  );
}
