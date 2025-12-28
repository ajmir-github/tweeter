import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import z from "zod";
import { Server } from "../services";
import { actions, useAppDispatch } from "../state";
import catchValidationError from "../utils/catchValidationError";
import LocalToken from "../utils/LocalToken";

const inputValidator = z.object({
  email: z.email(),
  password: z.string().min(2),
});

type Inputs = z.output<typeof inputValidator>;

export default function SignInPage() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>({ resolver: zodResolver(inputValidator) });
  const onSubmit = async (inputs: Inputs) =>
    Server.auth.signIn
      .mutate(inputs)
      .then(({ user, token }) => {
        dispatch(actions.auth.setUser(user));
        LocalToken.set(token);
      })
      .catch(catchValidationError(setError));

  return (
    <div className=" grow max-w-md  rounded-xl border border-gray-300 flex flex-col gap-px overflow-clip">
      <h1 className=" bg-white p-4 text-lg font-bold">Sign in here!</h1>
      <form
        className="bg-white p-4 gap-4 grid"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-2">
          <div className="font-semibold text-sm">Email:</div>
          <input
            className="bg-gray-200 rounded-xl p-2"
            {...register("email")}
          />
          {errors.email && (
            <div className="text-red-500 text-xs">{errors.email.message}</div>
          )}
        </div>
        <div className="grid gap-2">
          <div className="font-semibold text-sm">Password:</div>
          <input
            className="bg-gray-200 rounded-xl p-2"
            {...register("password")}
          />
          {errors.password && (
            <div className="text-red-500 text-xs">
              {errors.password.message}
            </div>
          )}
        </div>

        <div className="grid gap-2">
          <button
            className="bg-blue-500 p-2 rounded-xl text-white"
            type="submit"
          >
            Sign in
          </button>
          {errors.root && (
            <div className="text-red-500 text-xs">{errors.root.message}</div>
          )}
        </div>
      </form>

      <div className="bg-white p-4 flex justify-between gap-2">
        <Link
          to={"/signup"}
          className="italic hover:text-blue-600 hover:underline"
        >
          Create a new account
        </Link>
        <div className="italic opacity-40">Forget password</div>
      </div>
    </div>
  );
}
