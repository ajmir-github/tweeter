import { Database } from "./Database";

export const listUsers = async () => {
  return await Database.user.findMany();
};

export const getUserById = async (id: string) => {
  return await Database.user.findUnique({
    where: {
      id,
    },
  });
};

export const getUserByPhone = async (phone: string) => {
  return await Database.user.findUnique({
    where: {
      phone,
    },
  });
};

export const createUser = async ({
  email,
  password,
  phone,
  address,
  name,
}: {
  email: string;
  password: string;
  phone: string;
  address: string;
  name: string;
}) => {
  return await Database.user.create({
    data: {
      email,
      password,
      phone,
      address,
      name,
    },
  });
};
