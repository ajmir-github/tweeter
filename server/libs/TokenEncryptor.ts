import jwt from "jsonwebtoken";

type ErrorFormater<E extends Error = Error> = (message: string) => E;

export default class TokenEncryptor<Payload extends object> {
  protected secretKey: string;
  private options?: jwt.SignOptions;
  private errorFormater: ErrorFormater;
  constructor(
    secretKey: string,
    errorFormater: ErrorFormater,
    options?: jwt.SignOptions
  ) {
    this.secretKey = secretKey;
    this.options = options;
    this.errorFormater = errorFormater;
  }

  sign(payload: Payload): string {
    try {
      return jwt.sign(payload, this.secretKey, this.options);
    } catch (error) {
      if (error instanceof jwt.NotBeforeError) {
        throw this.errorFormater("Token is not active yet");
      } else if (error instanceof jwt.TokenExpiredError) {
        throw this.errorFormater("Token has expired");
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw this.errorFormater("Invalid Token");
      } else if (error instanceof Error) {
        throw this.errorFormater(error.message);
      }
      throw error;
    }
  }
  verify(token: string) {
    return jwt.verify(token, this.secretKey) as Payload;
  }
}
