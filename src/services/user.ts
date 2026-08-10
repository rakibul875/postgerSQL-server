import { Request, Response, Router } from "express";
import prisma from "../lib/prisma";
import { auth } from "../lib/auts";

const router = Router();

router.post("/api/auth/sign-up/email", async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const data = await prisma.user.create({
      data: userData,
    });

    res.json({
      success: true,
      message: "User created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error,
    });
  }
});

export default router;
