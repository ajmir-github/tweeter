import jwt from "jsonwebtoken";

export default class TokenEncryptor<Payload extends object> {
  protected secretKey: string;
  private options?: jwt.SignOptions;
  constructor(secretKey: string, options?: jwt.SignOptions) {
    this.secretKey = secretKey;
    this.options = options;
  }

  sign(payload: Payload): string {
    try {
      return jwt.sign(payload, this.secretKey, this.options);
    } catch (error) {
      if (error instanceof jwt.NotBeforeError) {
        throw new Error("Token is not active yet");
      } else if (error instanceof jwt.TokenExpiredError) {
        throw new Error("Token has expired");
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new Error("Invalid Token");
      }
      throw error;
    }
  }
  verify(token: string) {
    return jwt.verify(token, this.secretKey) as Payload;
  }
}
