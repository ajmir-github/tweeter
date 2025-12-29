import { database } from "./prisma";
import { verifyToken } from "./utils/encryptions";
import {
  createContext,
  ServerError,
  StatusCodes,
} from "./utils/expressContext";
export * from "./utils/expressContext";

export default createContext((request) => {
  // get the token and decode it
  const getToken = () => {
    if (!request.headers.authorization) return null;
    const token = request.headers.authorization.split(" ")[1];
    try {
      return verifyToken(token);
    } catch (error) {
      throw new ServerError(
        error instanceof Error ? error.message : "Failed to verify the token!",
        StatusCodes.UNAUTHORIZED
      );
    }
  };

  // get the authenticated user or return null
  const getAuthSafely = async () => {
    // decode the token
    const token = getToken();
    if (!token) return null;
    // find the user
    const user = await database.user.findUnique({
      where: {
        id: token.id,
      },
    });

    if (!user)
      throw new ServerError(
        "This user does not exist anymore!",
        StatusCodes.UNAUTHORIZED
      );

    return user;
  };

  // get the authenticated user of fail
  const getAuth = async () => {
    const auth = await getAuthSafely();
    if (!auth)
      throw new ServerError(
        "Authentication required!",
        StatusCodes.UNAUTHORIZED
      );
    return auth;
  };

  // inject the methods
  return {
    getToken,
    getAuth,
  };
}).use((context, req) => {
  return {};
});
