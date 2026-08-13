import { Request, Response, Router } from "express";
import prisma from "../lib/prisma";

const orderRouter = Router();
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
