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
import { Label } from "@/components/ui/label";
import { Server } from "@/services";
import { useAppDispatch } from "@/state";
import authSlice from "@/state/authSlice";
import handleFormError from "@/utils/handleFormError";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusSquareIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import z from "zod";

const inputValidator = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(6),
});

type Inputs = z.output<typeof inputValidator>;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const form = useForm<Inputs>({ resolver: zodResolver(inputValidator) });
  const onSubmit = async (inputs: Inputs) =>
    Server.auth.register
      .mutate(inputs)
      .then((res) => dispatch(authSlice.actions.signIn(res)))
      .catch(handleFormError(form))
      .catch((e) => console.error(e.data));

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xs">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Tamas: Social Media</CardTitle>
          <CardDescription>Create a new account</CardDescription>
          <CardAction>
            <Button variant="link" asChild>
              <Link to={"/login"}>Login</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="name" {...form.register("name")} />
              <FieldError>{form.formState.errors.name?.message}</FieldError>
            </div>
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
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <PlusSquareIcon />
            )}
            Register
          </Button>

          <Button variant="outline" className="w-full" disabled>
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
