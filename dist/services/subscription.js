"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const subscriptionRouter = (0, express_1.Router)();
subscriptionRouter.get("/my-payment/:id", async (req, res) => {
    const id = String(req.params.id);
    const data = await prisma_1.default.subscription.findMany({
        where: {
            userId: id,
        },
    });
    res.json({
        success: true,
        message: "Subscriptions retrieved successfully",
        data: data,
    });
});
subscriptionRouter.get("/payment", async (req, res) => {
    const data = await prisma_1.default.subscription.findMany();
    res.json({
        success: true,
        message: "Data retrieved successful",
        data: data,
    });
});
subscriptionRouter.post("/subscription", async (req, res) => {
    const subscriptionData = req.body;
    const sessionId = subscriptionData.sessionId;
    const existingSubscription = await prisma_1.default.subscription.findFirst({
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
    const data = await prisma_1.default.subscription.create({
        data: subscriptionData,
    });
    res.json({
        success: true,
        message: "Subscription created successfully",
        data: data,
    });
});
exports.default = subscriptionRouter;
