import { Request, Response, Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.get("/products", async (req: Request, res: Response) => {
  const products = await prisma.products.findMany();
  res.json({
    success: true,
    message: "Products retrieved successfully",
    data: products,
  });
});

router.post("/products", async (req: Request, res: Response) => {
  const productData = req.body;
  const data = await prisma.products.create({
    data: productData,
  });
  res.json({
    success: true,
    message: "Product created successfully",
    data: data,
  });
});
export default router;
