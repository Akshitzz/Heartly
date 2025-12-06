import { logger } from "@/utils/logger";
import { createClient } from "redis";


export class RedisClient {
    private static instance :RedisClient;
    private client  :any ; 


        constructor(){
            this.client  = createClient({
                socket :{
                    host : process.env.REDIS_HOST || "localhost",
                    port : parseInt(process.env.REDIS_PORT || '6379')
                },
                password  : process.env.REDIS_PASSWORD
            })
            this.client.on('error',(err:any)=>logger.error("Redis Error",err))
            this.client.on('connect',()=>logger.info('Redis Connected'));
            this.connect();
        };

         static getInstance() :RedisClient {
                if(!RedisClient.instance){
                    RedisClient.instance = new RedisClient();
                }
                return RedisClient.instance;
            }
             private async connect() {
    await this.client.connect();
  }
    async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.client.setEx(key, ttl, value);
    } else {
      await this.client.set(key, value);
    }
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }

  getClient() {
    return this.client;
  }
}