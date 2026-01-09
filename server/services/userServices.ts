import { database } from "../prisma";
import { UserWhereInput } from "../prisma/generated/models";
import { comparePassword, hashPassword } from "../utils/encryptions";
import { exclude } from "../utils/helpers";

export const listUsers = async (
  userId: number,
  {
    page = 1,
    search,
    only,
  }: {
    page?: number;
    search?: string;
    only?: "followers" | "followings";
  } = {}
) => {
  const where: UserWhereInput = {
    id: {
      not: userId,
    },
  };
  if (search)
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  if (only) {
    if (only === "followers")
      where.followers = {
        some: {
          followingId: userId,
        },
      };

    if (only === "followings")
      where.following = {
        some: {
          followerId: userId,
        },
      };
  }

  const users = await database.user.findMany({
    take: 50,
    skip: 50 * (page - 1),
    where,
    select: {
      id: true,
      name: true,
      email: true,
      avatarURL: true,
      _count: { select: { tweets: true } },
      followers: {
        select: { followingId: true },
        where: {
          followingId: userId,
        },
      },
    },
    orderBy: {
      id: "desc",
      // createdAt: "desc", // bring the recently created users on the top
    },
  });

  return users.map(({ followers, ...rest }) => ({
    ...rest,
    followed: followers.length > 0,
  }));
};

export const getUser = async (userId: number, targetUserId: number) => {
  const user = await database.user.findUnique({
    where: { id: targetUserId },
    select: {
      id: true,
      email: true,
      name: true,
      bio: true,
      avatarURL: true,
      _count: {
        select: {
          followers: true,
          following: true,
          tweets: true,
        },
      },
      followers: {
        select: { followingId: true },
        where: {
          followingId: userId,
        },
      },
    },
  });
  if (!user) return null;
  const { followers, ...rest } = user;
  return { ...rest, followed: followers.length > 0 };
};

export const getSelf = async (userId: number) => {
  const user = await database.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      bio: true,
      avatarURL: true,
      _count: {
        select: {
          followers: true,
          following: true,
          tweets: true,
        },
      },
    },
  });
  return user;
};

export const updateUser = async (
  userId: number,
  entries: Partial<{
    name: string;
    email: string;
    password: string;
    avatarURL: string | null;
    bio: string | null;
  }>
) => {
  const refinedEntries = { ...entries };
  // if password hash
  if (refinedEntries.password)
    refinedEntries.password = await hashPassword(refinedEntries.password);
  const user = await database.user.update({
    where: {
      id: userId,
    },
    data: refinedEntries,
    select: {
      id: true,
      email: true,
      name: true,
      bio: true,
      avatarURL: true,
      _count: {
        select: {
          followers: true,
          following: true,
          tweets: true,
        },
      },
    },
  });
  return user;
};

export const deleteUser = async (userId: number) => {
  await database.user.delete({
    where: {
      id: userId,
    },
  });
};

export const confirmUserEmailAndPassword = async (entries: {
  email: string;
  password: string;
}) => {
  const user = await database.user.findUnique({
    where: { email: entries.email },
    select: {
      id: true,
      email: true,
      name: true,
      bio: true,
      avatarURL: true,
      _count: {
        select: {
          followers: true,
          following: true,
          tweets: true,
        },
      },
      password: true,
    },
  });
  if (!user) throw new Error("Email not matched!");
  const passwordMatched = await comparePassword(
    entries.password,
    user.password
  );
  if (!passwordMatched) throw new Error("Password not matched!");
  return exclude(user, "password");
};
