import { Request, Response, Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.get("/products/latest", async (req: Request, res: Response) => {
  try {
    const products = await prisma.products.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    res.status(200).json({
      success: true,
      message: "Latest 3 products retrieved successfully",
      data: products,
    });
  } catch (error) {
    console.error("Get latest products error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve latest products",
      data: [],
    });
  }
});

router.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const product = await prisma.products.findUnique({
      where: {
        id: id,
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      data: product,
    });
  } catch (error) {
    console.error("Get single product error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve product",
      data: null,
    });
  }
});

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
