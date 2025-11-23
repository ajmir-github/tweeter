import Database, { Category } from "../models";

export const listCategories = async () => await Database.categories.findMany();

export const getCategoryById = async (id: string) =>
  await Database.categories.find((c) => c.id === id);

export const createCategory = async ({ name }: { name: string }) =>
  await Database.categories.insert({
    name,
    createdAt: new Date(),
    isDeleted: false,
  });

export const updateCategory = async (id: string, changes: Partial<Category>) =>
  await Database.categories.update(id, { ...changes, updatedAt: new Date() });

export const deleteCategory = async (id: string) =>
  await Database.categories.update(id, {
    isDeleted: true,
    deletedAt: new Date(),
    updatedAt: new Date(),
  });
