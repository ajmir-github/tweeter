import Database, { Product } from "../models";

export const listProducts = async () =>
  await Database.products.findMany((p) => !p.isDeleted);

export const getProductById = async (id: string) =>
  await Database.products.find((p) => p.id === id);

export const createProduct = async ({
  name,
  stock,
  price,
  images,
  description,
  sortOrder,
  featured,
  categoryId,
}: Omit<Product, "id" | "createdAt" | "updatedAt">) =>
  await Database.products.insert({
    name,
    stock,
    price,
    images,
    description,
    sortOrder,
    featured,
    categoryId,
    createdAt: new Date(),
    isDeleted: false,
  });

export const updateProduct = async (id: string, changes: Partial<Product>) =>
  await Database.products.update(id, { ...changes, updatedAt: new Date() });

export const deleteProduct = async (id: string) =>
  await Database.products.update(id, {
    isDeleted: true,
    deletedAt: new Date(),
    updatedAt: new Date(),
  });

export const recoverProduct = async (id: string) =>
  await Database.products.update(id, {
    isDeleted: false,
    deletedAt: undefined,
    updatedAt: new Date(),
  });
