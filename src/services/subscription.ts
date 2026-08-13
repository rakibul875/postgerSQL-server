import { Request, Response, Router } from "express";
import prisma from "../lib/prisma";

const subscriptionRouter = Router();

subscriptionRouter.post(
  "/subscription",
  async (req: Request, res: Response) => {
    const subscriptionData = req.body;
    const sessionId = subscriptionData.sessionId;
    const existingSubscription = await prisma.subscription.findFirst({
      where: {
        sessionId: sessionId,
      },
    });
    if (existingSubscription) {
      return res.status(400).json({
        success: false,
        message: "A subscription with this session ID already exists.",
      });
    }
    const data = await prisma.subscription.create({
      data: subscriptionData,
    });
    res.json({
      success: true,
      message: "Subscription created successfully",
      data: data,
    });
  },
);

export default subscriptionRouter;
