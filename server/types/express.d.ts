import { Tweet, User } from "../prisma";

// to make the file a module and avoid the TypeScript error
export {};
declare global {
  namespace Express {
    export interface Request {
      auth: any | User;
      user: any | User;
      tweet: any | Tweet;
      notification: any | Notification;
    }
  }
}
