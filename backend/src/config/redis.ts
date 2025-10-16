import { createClient } from "redis";

const REDIS_URL = "redis://:5Gcxi7iRIV09zwAeO20yHNNqFAj6dfw3@redis-10978.c270.us-east-1-3.ec2.redns.redis-cloud.com:10978";

const redisClient = createClient({
  url: REDIS_URL,
  socket: {
    reconnectStrategy: (retries) => {
      console.log(`🔄 Redis reconnect attempt #${retries}`);
      return Math.min(retries * 100, 3000); // retry delay up to 3s
    },
  },
});

redisClient.on("connect", () => {
  console.log("✅ Redis connected");
});

redisClient.on("ready", () => {
  console.log("🟢 Redis ready to use");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

redisClient.on("end", () => {
  console.warn("⚠️ Redis connection closed");
});

(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error("❌ Failed to connect to Redis:", err);
  }
})();

export default redisClient;
