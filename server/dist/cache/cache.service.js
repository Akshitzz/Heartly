import { RedisClient } from "./redis-client";
export class CacheService {
    constructor() {
        this.redisClient = RedisClient.getInstance();
    }
    async get(key) {
        return await this.redisClient.get(key);
    }
    async set(key, value, ttl) {
        return await this.redisClient.set(key, value, ttl);
    }
    async delete(key) {
        await this.redisClient.delete(key);
    }
    async clearPattern(pattern) {
        const client = this.redisClient.getClient();
        const keys = await client.keys(pattern);
        if (keys.length > 0) {
            await client.del(keys);
        }
    }
}
