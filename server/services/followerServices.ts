import { database } from "../prisma";

export const followUser = async (userId: number, followingId: number) => {
  await database.follower.create({
    data: {
      followerId: userId,
      followingId,
    },
  });
};

export const unfollowUser = async (userId: number, followingId: number) => {
  await database.follower.delete({
    where: {
      followerId_followingId: {
        followerId: userId,
        followingId,
      },
    },
  });
};
