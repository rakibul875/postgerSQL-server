import { Request, Response, Router } from "express";
import prisma from "../lib/prisma";

const subscriptionRouter = Router();

subscriptionRouter.post(
  "/subscription",
  async (req: Request, res: Response) => {
    const subscriptionData = req.body;
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
