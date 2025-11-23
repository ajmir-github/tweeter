import {
  User,
  Category,
  Order,
  OrderItem,
  Product,
  Review,
} from "./models/types";
import { createDatabase } from "./models/database";

const Database = createDatabase<{
  users: User[];
  categories: Category[];
  orders: Order[];
  orderItems: OrderItem[];
  products: Product[];
  reviews: Review[];
}>({});
