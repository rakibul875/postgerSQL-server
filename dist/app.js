"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_1 = require("better-auth/node");
const products_1 = __importDefault(require("./services/products"));
const user_1 = __importDefault(require("./services/user"));
const auts_1 = require("./lib/auts");
const cart_1 = __importDefault(require("./services/cart"));
const subscription_1 = __importDefault(require("./services/subscription"));
const order_1 = __importDefault(require("./services/order"));
const app = (0, express_1.default)();
dotenv_1.default.config();
// app.use(cors());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));
app.all("/api/auth/*splat", (0, node_1.toNodeHandler)(auts_1.auth));
app.use(express_1.default.json());
app.use(products_1.default);
app.use(user_1.default);
app.use(cart_1.default);
app.use(subscription_1.default);
app.use(order_1.default);
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the API",
    });
});
exports.default = app;
