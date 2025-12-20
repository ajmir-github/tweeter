import { StatusCodes } from "http-status-codes";
export { StatusCodes };

export default class ServerError extends Error {
  public readonly name: string;
  public readonly statusCode: number;
  public readonly cause?: Error;
  constructor({
    message,
    code,
    cause,
  }: {
    message?: string;
    code?: StatusCodes;
    cause?: Error;
  }) {
    super(message || "Internal Server Error");
    this.name = "ServerError";
    this.statusCode = code || StatusCodes.INTERNAL_SERVER_ERROR;
    this.cause = cause;
    // Required for Error subclassing in TS
    Object.setPrototypeOf(this, new.target.prototype);

    // Optional: cleaner stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
