import { Redis } from '@upstash/redis';

// Log environment variables to check their values
console.log("Redis URL:", process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL);
console.log("Redis Token:", process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN);

const redis = new Redis({
  url: `${process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL}`,
  token: `${process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN}`,
  retry: {
    retries: 5,
    backoff: (retryCount) => Math.exp(retryCount) * 50,
  },
})

export default redis