import Database, { Order, OrderStatus } from "../models";

export const listOrders = async () => await Database.orders.findMany();

export const getOrderById = async (id: string) =>
  await Database.orders.find((o) => o.id === id);

export const createOrder = async ({
  userId,
  address,
  total,
}: Omit<Order, "id" | "createdAt" | "updatedAt" | "status" | "time">) =>
  await Database.orders.insert({
    userId,
    address,
    total,
    status: OrderStatus.PREPARING,
    time: new Date(),
    createdAt: new Date(),
    isDeleted: false,
  });

export const updateOrder = async (id: string, changes: Partial<Order>) =>
  await Database.orders.update(id, { ...changes, updatedAt: new Date() });

export const deleteOrder = async (id: string) =>
  await Database.orders.update(id, {
    isDeleted: true,
    deletedAt: new Date(),
    updatedAt: new Date(),
  });
