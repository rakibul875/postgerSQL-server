"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const cartRouter = (0, express_1.Router)();
cartRouter.delete("/my-cart/:id", async (req, res) => {
    try {
        const id = String(req.params.id);
        const cartData = await prisma_1.default.cart.findUnique({
            where: {
                id: id,
            },
        });
        if (!cartData) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found",
                data: null,
            });
        }
        const deletedData = await prisma_1.default.cart.delete({
            where: {
                id: id,
            },
        });
        res.status(200).json({
            success: true,
            message: "Cart item deleted successfully",
            data: deletedData,
        });
    }
    catch (error) {
        console.error("Delete cart error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete cart item",
            data: null,
        });
    }
});
cartRouter.get("/cart/:id", async (req, res) => {
    const userId = String(req.params.id);
    const cartData = await prisma_1.default.cart.findMany({
        where: {
            userId: userId,
        },
    });
    res.json({
        success: true,
        message: "Cart data retrieved successfully",
        data: cartData,
    });
});
cartRouter.post("/cart", async (req, res) => {
    const cartData = req.body;
    const foodId = cartData.foodId;
    const existingCartItem = await prisma_1.default.cart.findFirst({
        where: {
            foodId: foodId,
        },
    });
    if (existingCartItem) {
        return res.status(400).json({
            success: false,
            message: "Item already in cart",
        });
    }
    const data = await prisma_1.default.cart.create({ data: cartData });
    res.json({
        success: true,
        message: "Add to Cart successfully",
        data: data,
    });
});
exports.default = cartRouter;
