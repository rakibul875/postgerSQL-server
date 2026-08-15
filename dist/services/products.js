"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const router = (0, express_1.Router)();
router.get("/products/latest", async (req, res) => {
    try {
        const products = await prisma_1.default.products.findMany({
            orderBy: {
                createdAt: "desc",
            },
            take: 4,
        });
        res.status(200).json({
            success: true,
            message: "Latest 4 products retrieved successfully",
            data: products,
        });
    }
    catch (error) {
        console.error("Get latest products error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve latest products",
            data: [],
        });
    }
});
router.get("/products/:id", async (req, res) => {
    try {
        const id = String(req.params.id);
        const product = await prisma_1.default.products.findUnique({
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
    }
    catch (error) {
        console.error("Get single product error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve product",
            data: null,
        });
    }
});
router.get("/products", async (req, res) => {
    try {
        const { search = "", category = "All" } = req.query;
        const searchText = String(search).trim();
        const categoryText = String(category).trim();
        const products = await prisma_1.default.products.findMany({
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
    }
    catch (error) {
        console.error("Get products error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve products",
            data: [],
        });
    }
});
router.post("/products", async (req, res) => {
    const productData = req.body;
    const data = await prisma_1.default.products.create({
        data: productData,
    });
    res.json({
        success: true,
        message: "Product created successfully",
        data: data,
    });
});
exports.default = router;
