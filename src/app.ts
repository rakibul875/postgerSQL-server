import express from "express";
import cors from "cors";
import router from "./services/products";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auts";
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.all("/api/auth/*", toNodeHandler(auth));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the API",
  });
});

export default app;
