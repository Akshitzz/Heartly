import { RedisClient } from "./redis-client";

export class CacheService {
    private redisClient :RedisClient;
    constructor(){
        this.redisClient =RedisClient.getInstance();
    }
    async get(key:string):Promise<string |null>{
        return await this.redisClient.get(key);
    }
    async set(key:string, value:string,ttl?:number):Promise<void>{
        return await this.redisClient.set(key,value,ttl);
    }
    async delete(key:string):Promise<void>{
        await this.redisClient.delete(key);
    }
    async clearPattern(pattern:string):Promise<void>{
        const client = this.redisClient.getClient();
        const keys = await client.keys(pattern);
        if(keys.length >0){
            await client.del(keys);
        }
    }
}