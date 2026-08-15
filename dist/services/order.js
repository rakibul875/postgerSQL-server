"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const orderRouter = (0, express_1.Router)();
orderRouter.delete("/my-order/:id", async (req, res) => {
    const id = String(req.params.id);
    const data = await prisma_1.default.order.delete({
        where: {
            id: id,
        },
    });
    res.json({
        success: true,
        message: "Order deleted successfully",
        data: data,
    });
});
orderRouter.patch("/orders/:id", async (req, res) => {
    const id = String(req.params.id);
    const { status } = req.body;
    const data = await prisma_1.default.order.update({
        where: {
            id: id,
        },
        data: {
            status,
        },
    });
    res.json({
        success: true,
        message: "Order status updated successfully",
        data,
    });
});
orderRouter.get("/my-order/:id", async (req, res) => {
    const userId = String(req.params.id);
    const data = await prisma_1.default.order.findMany({
        where: {
            userId: userId,
        },
    });
    res.json({
        success: true,
        message: "Orders retrieved successfully",
        data: data,
    });
});
orderRouter.get("/orders", async (req, res) => {
    const data = await prisma_1.default.order.findMany();
    res.json({
        success: true,
        message: "Orders retrieved successfully",
        data: data,
    });
});
orderRouter.post("/order", async (req, res) => {
    const orderData = req.body;
    const sessionId = orderData.sessionId;
    const existingOrder = await prisma_1.default.order.findFirst({
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
    const data = await prisma_1.default.order.create({
        data: orderData,
    });
    res.json({
        success: true,
        message: "Order created successfully",
        data: data,
    });
});
exports.default = orderRouter;
