import express from "express";
import { Port } from "./utils/appConfig";
import { userRouter } from "./routes/userRoutes";
import { productRouter } from "./routes/productRoutes";
import { orderRouter } from "./routes/orderRoutes";
import { categoryRouter } from "./routes/categoryRoutes";
import { reviewRouter } from "./routes/reviewRoutes";
import { orderItemRouter } from "./routes/orderItemRoutes";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mount routers
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/order-items", orderItemRouter);

app.listen(Port, () => {
  return console.log(`Express is listening at http://localhost:${Port}`);
});
