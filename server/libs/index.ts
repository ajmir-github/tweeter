import { TokenLifetime, TokenSecretKey } from "../constants";
import { User } from "../prisma";
import PasswordEncryptor from "./PasswordEcryptor";
import TokenEncryptor from "./TokenEncryptor";

export const tokenEncryptor = new TokenEncryptor<User>(TokenSecretKey, {
  expiresIn: TokenLifetime as any,
});
export const passwordEncryptor = new PasswordEncryptor();
