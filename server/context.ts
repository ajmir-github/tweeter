import { database } from "./prisma";
import { verifyToken } from "./utils/encryptions";
import {
  createContext,
  ServerError,
  StatusCodes,
} from "./utils/expressContext";
export * from "./utils/expressContext";

export const context = createContext((request) => {
  return { v: 1 };
});

export const authOptionalContext = context.use(async (context, request) => {
  // get the token and decode it
  if (!request.headers.authorization) return { auth: null };
  const token = request.headers.authorization.split(" ")[1];
  const { id } = verifyToken(token);

  if (!token) return { auth: null };
  // find the user
  const user = await database.user.findUnique({
    where: {
      id,
    },
  });

  if (!user)
    throw new ServerError(
      "This user does not exist anymore!",
      StatusCodes.UNAUTHORIZED
    );

  return { auth: user };
});

export const authRequiredContext = authOptionalContext.use(({ auth }) => {
  if (!auth)
    throw new ServerError("Authentication required!", StatusCodes.UNAUTHORIZED);

  return { auth };
});
