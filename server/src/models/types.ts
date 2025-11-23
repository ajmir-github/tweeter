enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
}

interface BaseDocument {
  id: string;
}
export interface User extends BaseDocument {
  phone: string;
  password: string;
  name: string;
  email?: string;
  address?: string;
  role: UserRole;
  createdAt: Date;
  lastLogin: Date;
  // soft delete
  isDeleted: boolean;
  deletedAt: Date;
  // Relationships
  //   orders: Order[];
  //   reviews: Reviews[];
}

export interface Category extends BaseDocument {
  name: string;
  // Relationships
  //   products: Product[];
}

export interface Product extends BaseDocument {
  name: string;
  stock: number;
  price: number;
  images: string[];
  description: string;
  sortOrder: number;
  featured: boolean;
  // Relationships
  productId: string;
  //   reviews:Reviews[],
}

export interface Review extends BaseDocument {
  comment?: string;
  rating: number;
  // Relationships
  userId: string;
  productId: string;
  //   user:User,
  //   product:Product
}
enum OrderStatus {
  PREPARING = "PREPARING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}
export interface Order extends BaseDocument {
  status: OrderStatus;
  address: string;
  total: number;
  time: Date;
  // Relationships
  userId: string;
  //   items: OrderItem[];
  //   user: User;
}
export interface OrderItem extends BaseDocument {
  quantity: number;
  price: number;
  // Relationships
  productId: string;
  orderId: string;
  //   order:Order
}
