import Database, { OrderItem } from "../models";

export const listOrderItems = async (orderId: string) =>
  await Database.orderItems.findMany((oi) => oi.orderId === orderId);

export const getOrderItemById = async (id: string) =>
  await Database.orderItems.find((oi) => oi.id === id);

export const createOrderItem = async ({
  quantity,
  price,
  productId,
  orderId,
}: Omit<OrderItem, "id" | "createdAt" | "updatedAt">) =>
  await Database.orderItems.insert({
    quantity,
    price,
    productId,
    orderId,
    createdAt: new Date(),
    isDeleted: false,
  });

export const updateOrderItem = async (
  id: string,
  changes: Partial<OrderItem>
) =>
  await Database.orderItems.update(id, { ...changes, updatedAt: new Date() });

export const deleteOrderItem = async (id: string) =>
  await Database.orderItems.update(id, {
    isDeleted: true,
    deletedAt: new Date(),
    updatedAt: new Date(),
  });
