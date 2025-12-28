import { Request } from "express";
import { ZodType } from "zod";
import { StatusCodes } from "../constants";

export const validateBody = async <Body>(
  req: Request,
  validator: ZodType<Body>
) => {
  const validation = await validator.safeParseAsync(req.body);
  if (!validation.success) {
    throw {
      status: StatusCodes.BAD_REQUEST,
      error: {
        message: "Invalid request body",
        errors: validation.error.issues,
      },
    };
  }

  return validation.data;
};
export const validateParams = async <Params extends Record<string, string>>(
  req: Request,
  validator: ZodType<Params>
) => {
  const validation = await validator.safeParseAsync(req.params);
  if (!validation.success) {
    throw {
      status: StatusCodes.BAD_REQUEST,
      error: {
        message: "Invalid request params",
        errors: validation.error.issues,
      },
    };
  }

  return validation.data;
};
export const validateQuery = async <Body>(
  req: Request,
  validator: ZodType<Body>
) => {
  const validation = await validator.safeParseAsync(req.body);
  if (!validation.success) {
    throw {
      status: StatusCodes.BAD_REQUEST,
      error: {
        message: "Invalid request body",
        errors: validation.error.issues,
      },
    };
  }

  return validation.data;
};
