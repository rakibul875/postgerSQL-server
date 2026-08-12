import { Request, Response, Router } from "express";
import prisma from "../lib/prisma";

const cartRouter = Router();

cartRouter.get("/cart", async (req: Request, res: Response) => {
  const cartData = await prisma.cart.findMany();
  res.json({
    success: true,
    message: "Cart data retrieved successfully",
    data: cartData,
  });
});

cartRouter.post("/cart", async (req: Request, res: Response) => {
  const cartData = req.body;
  const data = await prisma.cart.create({ data: cartData });
  res.json({
    success: true,
    message: "Add to Cart successfully",
    data: data,
  });
});
export default cartRouter;
