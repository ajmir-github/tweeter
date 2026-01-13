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
import { LogInIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
import z from "zod";

const inputValidator = z.object({
  email: z.email(),
  password: z.string().min(2),
});

type Inputs = z.output<typeof inputValidator>;

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const form = useForm<Inputs>({ resolver: zodResolver(inputValidator) });

  const onSubmit = async (inputs: Inputs) =>
    Server.auth.login
      .mutate(inputs)
      .then((res) => {
        dispatch(authSlice.actions.signIn(res));
        toast(`${res.user.name}, you are logged in!`);
      })
      .catch(handleFormError(form))
      .catch(console.log);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold uppercase">
        Login to your user account!
      </h1>
      <form className="gap-4 grid" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
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
                <LogInIcon />
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
        <Link to={"/register"}>
          <span className="italic">Create a new account</span>
        </Link>
      </Button>
    </div>
  );
}
