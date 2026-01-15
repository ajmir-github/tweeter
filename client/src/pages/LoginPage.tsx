import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Server } from "@/services";
import { useAppDispatch } from "@/state";
import authSlice from "@/state/authSlice";
import handleFormError from "@/utils/handleFormError";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Loader2, LogInIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import z from "zod";

const inputValidator = z.object({
  email: z.email({ error: "Provide a valid email" }),
  password: z.string().min(6, {
    error: "Provide a password that contains at least 6 characters",
  }),
});

type Inputs = z.output<typeof inputValidator>;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const form = useForm<Inputs>({ resolver: zodResolver(inputValidator) });

  const onSubmit = async (inputs: Inputs) => {
    setLoading(true);
    Server.auth.login
      .mutate(inputs)
      .then((res) => dispatch(authSlice.actions.signIn(res)))
      .catch(handleFormError(form))
      .catch(console.log)
      .finally(() => setLoading(false));
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xs">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Tamas: Social Media</CardTitle>
          <CardDescription>Login to your account</CardDescription>
          <CardAction>
            <Button variant="link" asChild>
              <Link to={"/register"}>Register</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...form.register("email")} />
              <FieldError>{form.formState.errors.email?.message}</FieldError>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...form.register("password")}
              />
              <FieldError>{form.formState.errors.password?.message}</FieldError>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : <LogInIcon />}
            Login
          </Button>

          <Button variant="outline" className="w-full" disabled>
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
