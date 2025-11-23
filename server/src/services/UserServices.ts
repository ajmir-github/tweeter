export const listUsers = async () =>
  await Database.user.findMany({ where: { isDeleted: false } });

export const listDeletedUsers = async () =>
  await Database.user.findMany({ where: { isDeleted: true } });

export const getUserById = async (id: string) =>
  await Database.user.findUnique({
    where: {
      id,
    },
  });

export const getUserByPhone = async (phone: string) =>
  await Database.user.findUnique({
    where: {
      phone,
    },
  });
export const getUserByEmail = async (email: string) =>
  await Database.user.findUnique({
    where: {
      email,
    },
  });

export const createUser = async ({
  phone,
  password,
  name,
}: {
  phone: string;
  password: string;
  name: string;
}) =>
  await Database.user.create({
    data: {
      phone,
      password,
      name,
    },
  });

export const updateUser = async (
  id: string,
  entries: {
    phone?: string;
    password?: string;
    email?: string;
    name?: string;
    address?: string;
    role?: Role;
  }
) =>
  await Database.user.update({
    where: { id },
    data: entries,
  });

export const deleteUser = async (id: string) =>
  await Database.user.update({
    where: { id },
    data: { isDeleted: true, deletedAt: new Date() },
  });

export const recoverUser = async (id: string) =>
  await Database.user.update({
    where: { id },
    data: {
      isDeleted: false,
      deletedAt: null,
    },
  });
