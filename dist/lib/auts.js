"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const better_auth_1 = require("better-auth");
const prisma_1 = require("better-auth/adapters/prisma");
const client_1 = require("../generated/prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const adapter_pg_1 = require("@prisma/adapter-pg");
dotenv_1.default.config();
const adapter = new adapter_pg_1.PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new client_1.PrismaClient({
    adapter,
});
exports.auth = (0, better_auth_1.betterAuth)({
    trustedOrigins: [process.env.CLIENT_URL || "http://localhost:5173"],
    database: (0, prisma_1.prismaAdapter)(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "customer",
            },
        },
    },
});
