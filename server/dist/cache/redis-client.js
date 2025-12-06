import { logger } from "@/utils/logger";
import { createClient } from "redis";
export class RedisClient {
    constructor() {
        this.client = createClient({
            socket: {
                host: process.env.REDIS_HOST || "localhost",
                port: parseInt(process.env.REDIS_PORT || '6379')
            },
            password: process.env.REDIS_PASSWORD
        });
        this.client.on('error', (err) => logger.error("Redis Error", err));
        this.client.on('connect', () => logger.info('Redis Connected'));
        this.connect();
    }
    ;
    static getInstance() {
        if (!RedisClient.instance) {
            RedisClient.instance = new RedisClient();
        }
        return RedisClient.instance;
    }
    async connect() {
        await this.client.connect();
    }
    async set(key, value, ttl) {
        if (ttl) {
            await this.client.setEx(key, ttl, value);
        }
        else {
            await this.client.set(key, value);
        }
    }
    async delete(key) {
        await this.client.del(key);
    }
    getClient() {
        return this.client;
    }
}
