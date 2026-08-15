"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const router = (0, express_1.Router)();
router.get("/users", async (req, res) => {
    const data = await prisma_1.default.user.findMany();
    res.json({
        success: true,
        message: "Users retrieved successfully",
        data: data,
    });
});
router.post("/api/auth/sign-up/email", async (req, res) => {
    try {
        const userData = req.body;
        const data = await prisma_1.default.user.create({
            data: userData,
        });
        res.json({
            success: true,
            message: "User created successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create user",
            error,
        });
    }
});
exports.default = router;
