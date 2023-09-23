import rateLimit from "express-rate-limit";

export default class RateLimiter {
static limiterPerSecond = rateLimit({
    windowMs: 1000, // 1 second
    max: 1, // Maximum 1 request per second
    message: 'Rate limit exceeded. Please wait a moment.',
});

static limiterPerMinute = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 15, // Maximum 15 requests per minute
    message: 'Rate limit exceeded. Please wait a moment.',
});

static limiterPerHour = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 100, // Maximum 100 requests per hour
    message: 'Rate limit exceeded. Please wait a moment.',
});
}