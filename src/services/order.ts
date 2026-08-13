import { Request, Response, Router } from "express";
import prisma from "../lib/prisma";

const orderRouter = Router();
orderRouter.delete("/my-order/:id", async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const data = await prisma.order.delete({
    where: {
      id: id,
    },
  });
  res.json({
    success: true,
    message: "Order deleted successfully",
    data: data,
  });
});
orderRouter.get("/my-order/:id", async (req: Request, res: Response) => {
  const userId = String(req.params.id);
  const data = await prisma.order.findMany({
    where: {
      userId: userId,
    },
  });
  res.json({
    success: true,
    message: "Orders retrieved successfully",
    data: data,
  });
});

orderRouter.get("/orders", async (req: Request, res: Response) => {
  const data = await prisma.order.findMany();
  res.json({
    success: true,
    message: "Orders retrieved successfully",
    data: data,
  });
});

orderRouter.post("/order", async (req: Request, res: Response) => {
  const orderData = req.body;
  const sessionId = orderData.sessionId;
  const existingOrder = await prisma.order.findFirst({
    where: {
      sessionId: sessionId,
    },
  });
  if (existingOrder) {
    return res.status(400).json({
      success: false,
      message: "Order already exists",
      data: null,
    });
  }
  const data = await prisma.order.create({
    data: orderData,
  });
  res.json({
    success: true,
    message: "Order created successfully",
    data: data,
  });
});
export default orderRouter;
