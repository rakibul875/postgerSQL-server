import { Request, Response, Router } from "express";
import prisma from "../lib/prisma";

const cartRouter = Router();

cartRouter.delete("/my-cart/:id", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const cartData = await prisma.cart.findUnique({
      where: {
        id: id,
      },
    });

    if (!cartData) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
        data: null,
      });
    }

    const deletedData = await prisma.cart.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Cart item deleted successfully",
      data: deletedData,
    });
  } catch (error) {
    console.error("Delete cart error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete cart item",
      data: null,
    });
  }
});

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
