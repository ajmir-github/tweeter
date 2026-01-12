import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";
import Collection from "../utils/Collection";

function generator<T>(
  func: (current: number) => T,
  { to, from = 1 }: { from?: number; to: number }
) {
  const results: T[] = [];
  for (let current = from; current <= to; current++)
    results.push(func(current));
  return results;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name?: string;
  bio?: string;
  avatar?: string;
}
const userIds = generator(() => uuid(), { to: 10 });
export const User = new Collection(
  "/data/users.json",
  generator<User>(
    (c) => ({
      id: userIds[c],
      email: faker.internet.email(),
      password: "123456",
      name: faker.datatype.boolean() ? faker.person.fullName() : undefined,
      avatar: faker.datatype.boolean() ? faker.image.avatar() : undefined,
      bio: faker.datatype.boolean() ? faker.person.bio() : undefined,
    }),
    { to: 10 }
  )
);

export interface Tweet {
  id: string;
  content: string;
  hashtags: string[];
  images: string[];
  video?: string;
  createdAt: Date;
}

const tweetIds = generator(() => uuid(), { to: 500 });
export const Tweet = new Collection("/data/tweets.json");

export interface TweetLike {
  userId: string;
  tweetId: string;
}
export const TweetLike = new Collection("/data/tweetLikes.json");

export interface Follower {
  followerId: string;
  followingId: string;
}

export const Follower = new Collection("/data/followers.json");

export interface Notification {
  id: string;
  type: "LINK" | "FOLLOW" | "REPLY";
  message: string;
  read: boolean;
  createdAt: Date;
  recipientId: string;
  actorId?: string;
  tweetId?: string;
}

export const Notification = new Collection("/data/notifications.json");
