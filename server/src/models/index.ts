import { User, Category, Order, OrderItem, Product, Review } from "./types";
import { createDatabase } from "./database";

export * from "./types";

const Database = createDatabase<{
  users: User[];
  categories: Category[];
  orders: Order[];
  orderItems: OrderItem[];
  products: Product[];
  reviews: Review[];
}>({});

export default Database;
