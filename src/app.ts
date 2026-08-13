import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import productRouter from "./services/products";
import userRouter from "./services/user";
import { auth } from "./lib/auts";
import cartRouter from "./services/cart";
import subscriptionRouter from "./services/subscription";
const app = express();
dotenv.config();
// app.use(cors());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use(productRouter);
app.use(userRouter);
app.use(cartRouter);
app.use(subscriptionRouter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the API",
  });
});

export default app;
