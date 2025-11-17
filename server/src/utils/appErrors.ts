import zod from "zod";

//  Unknown Error
export class AppError extends Error {
  status: number;
  constructor(message: string, status: number = 500, name: string = "Error") {
    super();
    this.message = message;
    this.name = name;
    this.status = status;
  }
}

// Authetication required
export class Unauthorized extends AppError {
  constructor(message: string) {
    super(message, 401, "Unauthorized");
  }
}

// Unique inputs required
export class Conflict extends AppError {
  constructor(message: string) {
    super(message, 409, "Conflict");
  }
}

// Authorization required
export class Forbidden extends AppError {
  constructor(message: string) {
    super(message, 403, "Forbidden");
  }
}

// Invalid Inputs
export class BadRequest extends AppError {
  details: zod.ZodError;
  constructor(message: string, details: zod.ZodError) {
    super(message, 400, "BadRequest");
    this.details = details;
  }
}

// Data not found
export class NotFound extends AppError {
  constructor(message: string) {
    super(message, 404, "NotFound");
  }
}
