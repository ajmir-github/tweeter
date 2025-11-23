import Database, { Review } from "../models";

export const listReviewsByProduct = async (productId: string) =>
  await Database.reviews.findMany((r) => r.productId === productId);

export const getReviewById = async (id: string) =>
  await Database.reviews.find((r) => r.id === id);

export const createReview = async ({
  comment,
  rating,
  userId,
  productId,
}: Omit<Review, "id" | "createdAt" | "updatedAt">) =>
  await Database.reviews.insert({
    comment,
    rating,
    userId,
    productId,
    createdAt: new Date(),
    isDeleted: false,
  });

export const updateReview = async (id: string, changes: Partial<Review>) =>
  await Database.reviews.update(id, { ...changes, updatedAt: new Date() });

export const deleteReview = async (id: string) =>
  await Database.reviews.update(id, {
    isDeleted: true,
    deletedAt: new Date(),
    updatedAt: new Date(),
  });
