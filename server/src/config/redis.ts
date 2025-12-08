import { createClient ,RedisClientType } from "redis";
import { logger } from "@/utils/logger";


export interface RedisConfig {
    host:string;
    port:number;
    password?:string;
    db?:number;
     retryStrategy?: (times: number,cause :Error) => false | number | Error;
}



export class RedisConfig {

private static client  : RedisClientType;
private static subscriber :RedisClientType;
private static publisher  :RedisClientType;


static getConfig() :RedisConfig {
    return {
        host : process.env.REDIS_HOST || "localhost",
        port : parseInt(process.env.REDIS_PORT || '6379'),
        password : process.env.REDIS_PASSWORD || undefined,
        db : parseInt(process.env.REDIS_DB || '0'),
        retryStrategy :(times:number)=>{
            const delay = Math.min(times *50 *2000);
            return delay;
        }
    };
}


static async connect() : Promise<RedisClientType>{
    if(this.client){
        return this.client;
    }
    const config  = this.getConfig();

    this.client = createClient({
        socket :{
            host : config.host,
            port : config.port,
            reconnectStrategy :config.retryStrategy,
        },
        password : config.password,
        database :config.db,
    });

    this.client.on('error',(err)=>{
        logger.error('Redis Client Error: ',err);
    })

    this.client.on('connect',()=>{
        logger.info('Redis Client COnnected');
    });


    this.client.on('ready',()=>{
        logger.info("Redis client is ready ");
    })
    
    this.client.on('reconnecting',()=>{
        logger.warn("Redis Client Reconnecting");
    })

    await this.client.connect();
        return this.client;
}

static async getSubcriber() :Promise<RedisClientType>{
    if(this.subscriber){
        return this.subscriber;
    }
    const config = this.getConfig();

    this.subscriber = createClient({
        socket:{
        host:config.host,
        port :config.port,
    },
    password: config.password,
    database  : config.db,
    });

    await this.subscriber.connect();
    logger.info("Redis Subscriber Connected");


    return this.subscriber;
}

static async getPublisher():Promise<RedisClientType>{
    if(this.publisher){
        return this.publisher;
    }

    const config = this.getConfig();
    this.publisher = createClient({
        socket :{
            host:config.host,
            port:config.port,
        },
        password :config.password,
        database :config.db
    })

    await this.publisher.connect();
    logger.info("Redis Publisher Connected");
    return this.publisher;
}

static async disconnect() :Promise<void>{
        if(this.client){
        await this.client.quit();
        logger.info('Redis Client Disconnected');
        }
        if(this.subscriber){
        await this.subscriber.quit();
        logger.info("Redis Subcriber Disconnected");
        }
        if(this.publisher){
        await this.publisher.quit();
        logger.info("Redis Publisher  disconnected");
        }
    }
}