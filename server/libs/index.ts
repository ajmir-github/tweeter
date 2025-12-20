import { TRPCError } from "@trpc/server";
import { TokenLifetime, TokenSecretKey } from "../constants";
import PasswordEncryptor from "./PasswordEcryptor";
import TokenEncryptor from "./TokenEncryptor";

export const tokenEncryptor = new TokenEncryptor<{ userId: string }>(
  TokenSecretKey,
  (message) => {
    return new TRPCError({
      code: "FORBIDDEN",
      message,
    });
  },
  {
    expiresIn: TokenLifetime as any,
  }
);
export const passwordEncryptor = new PasswordEncryptor();
