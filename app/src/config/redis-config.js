import bluebird from "bluebird"
import cache from "express-redis-cache"
import { RateLimiterRedis } from 'rate-limiter-flexible'
import { redis_host as host } from "./index"

const redis = bluebird.promisifyAll(require('redis'))
const client = redis.createClient({ host })
const cacheClient = cache({ client, expire: 60 })
/** Brute force attacks */
const rateLimiter = new RateLimiterRedis({
    redis: client,
    keyPrefix: 'brute',
    points: 10, // 10 requests (In our case 1 point = 1 request)
    duration: 1, // per 1 second by IP
    blockDuration: 60*10 // seconds
});

client.on('connect', () => console.log('> Connected to Redis DB!'))
export { client, cacheClient, rateLimiter }