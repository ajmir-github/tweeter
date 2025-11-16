import { Server } from "./server";

interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const listProducts = async () => {
  const { data } = await Server.get("/products");
  return data as Product[];
};
const getProduct = async (id: number) => {
  const { data } = await Server.get(`/products/${id}`);
  if (!data) return null;
  return data as Product;
};

export async function test() {
  const product = await listProducts();
  console.log(product);
}
