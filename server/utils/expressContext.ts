import Express from "express";
import { StatusCodes } from "http-status-codes";
import z, { ZodError } from "zod";
export { StatusCodes };

type Promisy<T> = T | Promise<T>;
type ContextBuilder<Context extends {}> = (
  request: Express.Request,
  response: Express.Response
) => Promisy<Context>;
type ContextMiddleware<Context extends {}, Extend extends {}> = (
  context: Context,
  request: Express.Request,
  response: Express.Response
) => Promisy<Extend | void>;

type ContextHandler<Context extends {}, Data> = (
  context: Context,
  request: Express.Request,
  response: Express.Response
) => Promisy<Data>;

export class ServerError extends Error {
  constructor(
    public message: string = "Server failed",
    public status: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR,
    public issues: z.core.$ZodIssue[] = []
  ) {
    super(message);
  }
  static from(error: any) {
    if (error instanceof ServerError) return error;
    if (error instanceof ZodError)
      return new ServerError(
        z.prettifyError(error),
        StatusCodes.BAD_REQUEST,
        error.issues
      );
    if (error instanceof Error)
      return new ServerError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    // server failed unhandled error
    console.error(error);
    return new ServerError("Server failed!", StatusCodes.INTERNAL_SERVER_ERROR);
  }

  send(response: Express.Response) {
    return response.status(this.status).json({
      message: this.message,
      issues: this.issues,
    });
  }
}

export function createContext<Context extends {}>(
  initContext: ContextBuilder<Context>
) {
  // use function to chain the middlewares
  function use<Extend extends {}>(
    middleware: ContextMiddleware<Context, Extend>
  ) {
    return createContext(async (request, response) => {
      const context = await initContext(request, response);
      const extend = await middleware(context, request, response);
      // extend the context
      return {
        ...context,
        ...(extend ?? {}),
      } as Context & (Extend extends {} ? Extend : {});
    });
  }
  // handle function to handle the finals and send response back

  function handle<Data>(
    handler: ContextHandler<Context, Data>
  ): Express.Handler {
    return async (request, response, next) => {
      try {
        const context = await initContext(request, response);
        const result = await handler(context, request, response);
        response.json(result);
      } catch (error) {
        ServerError.from(error).send(response);
      }
    };
  }

  // done
  return { use, handle };
}
