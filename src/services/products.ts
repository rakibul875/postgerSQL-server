import { Request, Response, Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.get("/products", async (req: Request, res: Response) => {
  try {
    const { search = "", category = "All" } = req.query;

    const searchText = String(search).trim();
    const categoryText = String(category).trim();

    const products = await prisma.products.findMany({
      where: {
        AND: [
          searchText
            ? {
                name: {
                  contains: searchText,
                  mode: "insensitive",
                },
              }
            : {},
          categoryText && categoryText !== "All"
            ? {
                category: {
                  equals: categoryText,
                  mode: "insensitive",
                },
              }
            : {},
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    console.error("Get products error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve products",
      data: [],
    });
  }
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
