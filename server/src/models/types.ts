export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
}

export interface BaseDocument {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
  deletedAt?: Date;
}

// User
export interface User extends BaseDocument {
  email: string;
  password: string;
  name: string;
  phone?: string;
  address?: string;
  role: UserRole;
  lastLogin: Date;
  // Relationships
  // orders: Order[];
  // reviews: Review[];
}

// Category
export interface Category extends BaseDocument {
  name: string;
  // Relationships
  // products: Product[];
}

// Product
export interface Product extends BaseDocument {
  name: string;
  stock: number;
  price: number;
  images: string[];
  description: string;
  sortOrder: number;
  featured: boolean;
  categoryId: string;
  // Relationships
  // reviews: Review[];
}

// Review
export interface Review extends BaseDocument {
  comment?: string;
  rating: number;
  userId: string;
  productId: string;
  // Relationships
  // user: User;
  // product: Product;
}

export enum OrderStatus {
  PREPARING = "PREPARING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

// Order
export interface Order extends BaseDocument {
  status: OrderStatus;
  address: string;
  total: number;
  time: Date;
  userId: string;
  // Relationships
  // items: OrderItem[];
  // user: User;
}

// OrderItem
export interface OrderItem extends BaseDocument {
  quantity: number;
  price: number;
  productId: string;
  orderId: string;
  // Relationships
  // order: Order;
}
