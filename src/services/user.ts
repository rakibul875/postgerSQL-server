import { Request, Response, Router } from "express";
import prisma from "../lib/prisma";

const router = Router();
router.post("/users", async (req: Request, res: Response) => {
  const userData = req.body;
  const data = await prisma.user.create({
    data: userData,
  });
  res.json({
    success: true,
    message: "User created successfully",
    data: data,
  });
});
export default router;
