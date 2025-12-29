import { database } from "../prisma";
import { verifyToken } from "../utils/encryptions";
import { ServerError, StatusCodes } from "../utils/expressContext";
import Context from "./Context";

export const AuthOptionalContext = Context.use(async (context, request) => {
  // get the token and decode it
  if (!request.headers.authorization) return { auth: null };
  const token = request.headers.authorization.split(" ")[1];
  const payload = verifyToken(token);
  if (!payload.id)
    throw new ServerError("Token malformed!", StatusCodes.UNAUTHORIZED);
  if (!token) return { auth: null };
  // find the user
  const user = await database.user.findUnique({
    where: {
      id: payload.id,
    },
  });

  if (!user)
    throw new ServerError(
      "This user does not exist anymore!",
      StatusCodes.UNAUTHORIZED
    );

  return { auth: user };
});

export const AuthRequiredContext = AuthOptionalContext.use(({ auth }) => {
  if (!auth)
    throw new ServerError("Authentication required!", StatusCodes.UNAUTHORIZED);

  return { auth };
});
