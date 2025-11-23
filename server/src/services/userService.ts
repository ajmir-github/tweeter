import Database, { User, UserRole } from "../models";

export const listUsers = async () =>
  await Database.users.findMany((u) => !u.isDeleted);

export const getUserById = async (id: string) =>
  await Database.users.find((u) => u.id === id);

export const getUserByEmail = async (email: string) =>
  await Database.users.find((u) => u.email === email);

export const createUser = async ({
  email,
  password,
  name,
  phone,
  address,
}: Omit<User, "id" | "createdAt" | "updatedAt" | "lastLogin">) =>
  await Database.users.insert({
    email,
    password,
    name,
    phone,
    address,
    role: UserRole.USER,
    createdAt: new Date(),
    lastLogin: new Date(),
    isDeleted: false,
  });

export const updateUser = async (id: string, changes: Partial<User>) =>
  await Database.users.update(id, { ...changes, updatedAt: new Date() });

export const deleteUser = async (id: string) =>
  await Database.users.update(id, {
    isDeleted: true,
    deletedAt: new Date(),
    updatedAt: new Date(),
  });

export const recoverUser = async (id: string) =>
  await Database.users.update(id, {
    isDeleted: false,
    deletedAt: undefined,
    updatedAt: new Date(),
  });
