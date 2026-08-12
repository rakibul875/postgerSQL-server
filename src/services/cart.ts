import { Request, Response, Router } from "express";
import prisma from "../lib/prisma";

const cartRouter = Router();

cartRouter.get("/cart/:id", async (req: Request, res: Response) => {
  const userId = String(req.params.id);
  const cartData = await prisma.cart.findMany({
    where: {
      userId: userId,
    },
  });
  res.json({
    success: true,
    message: "Cart data retrieved successfully",
    data: cartData,
  });
});

cartRouter.post("/cart", async (req: Request, res: Response) => {
  const cartData = req.body;
  const foodId = cartData.foodId;
  const existingCartItem = await prisma.cart.findFirst({
    where: {
      foodId: foodId,
    },
  });
  if (existingCartItem) {
    return res.status(400).json({
      success: false,
      message: "Item already in cart",
    });
  }
  const data = await prisma.cart.create({ data: cartData });
  res.json({
    success: true,
    message: "Add to Cart successfully",
    data: data,
  });
});
export default cartRouter;
