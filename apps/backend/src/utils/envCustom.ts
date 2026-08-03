import "dotenv/config";

export const envCustom = {
  Port: process.env.PORT,
  redisConnection: process.env.REDIS,
};
