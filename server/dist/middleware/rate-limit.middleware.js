import rateLimit from "express-rate-limit";
import { RedisClient } from "../cache/redis-client.js";
import { RedisStore } from "rate-limit-redis";
export const rateLimiter = (options) => {
    const redisClient = new RedisClient();
    return rateLimit({
        store: new RedisStore({
            sendCommand: (...args) => redisClient.getClient().sendCommand(args),
        }),
        windowMs: options.windowMs,
        max: options.max,
        message: "Too many requests , please try again ater sometime :)",
        standardHeaders: true,
        legacyHeaders: false
    });
};
