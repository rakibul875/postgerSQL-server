import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import productRouter from "./services/products";
import userRouter from "./services/user";
import { auth } from "./lib/auts";
import cartRouter from "./services/cart";
import subscriptionRouter from "./services/subscription";
import orderRouter from "./services/order";
const app = express();
app.set("trust proxy", 1);
dotenv.config();
const allowedOrigins = [
  "https://restauranthub-lovat.vercel.app",
  process.env.CLIENT_URL,
].filter((url): url is string => Boolean(url));

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use(productRouter);
app.use(userRouter);
app.use(cartRouter);
app.use(subscriptionRouter);
app.use(orderRouter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the API",
  });
});

export default app;
