// user services

import { database, Prisma } from "./prisma";

function normalizeCount<T extends { _count: {} }>({ _count, ...rest }: T) {
  return { ...rest, ..._count };
}

export const listUsers = async ({
  userId,
  take = 50,
  skip = 0,
  search,
  only,
}: {
  skip?: number;
  take?: number;
  userId: number;
  search?: string;
  only?: "followers" | "followings";
}) => {
  const where: Prisma.UserWhereInput = {
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
  const select: Prisma.UserSelect = {
    id: true,
    name: true,
    email: true,
    avatarURL: true,
    _count: { select: { tweets: true } },
  };
  const users = await database.user.findMany({
    take,
    skip,
    where,
    select,
    orderBy: {
      createdAt: "desc",
    },
  });

  return users.map(normalizeCount);
};

export const getUserById = async (id: number) => {
  const user = await database.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      bio: true,
      avatarURL: true,
      createdAt: true,
      _count: {
        select: {
          followers: true,
          following: true,
          tweets: true,
        },
      },
    },
  });

  if (!user) return null;
  return normalizeCount(user);
};

async function main() {
  console.log(await listUsers({ userId: 1 }));

  const user = await getUserById(1);
  console.log(user);
}

main();
