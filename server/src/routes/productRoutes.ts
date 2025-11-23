import { Router } from "express";
import * as productService from "../services/productService";

export const productRouter = Router();

productRouter.get("/", async (_req, res) => {
  const products = await productService.listProducts();
  res.json(products);
});

productRouter.get("/:id", async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

productRouter.post("/", async (req, res) => {
  const newProduct = await productService.createProduct(req.body);
  res.status(201).json(newProduct);
});

productRouter.put("/:id", async (req, res) => {
  const updated = await productService.updateProduct(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Product not found" });
  res.json(updated);
});

productRouter.delete("/:id", async (req, res) => {
  const deleted = await productService.deleteProduct(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Product not found" });
  res.json(deleted);
});
