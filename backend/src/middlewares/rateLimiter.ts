import { Socket } from "socket.io";
import redisClient from "../config/redis";

const RATE_LIMIT_SPINS = Number(process.env.RATE_LIMIT_SPINS) || 10;
const RATE_LIMIT_WINDOW = Number(process.env.RATE_LIMIT_WINDOW) || 60;

export const rateLimiter = async (
  socket: Socket,
  next: (err?: any) => void
) => {
  try {
    const userId = socket.data.user._id;
    const key = `rate:${userId}`;
    const count = await redisClient.incr(key);

    if (count === 1) await redisClient.expire(key, RATE_LIMIT_WINDOW);
    if (count > RATE_LIMIT_SPINS) {
      return true;
    }
    return false;
  } catch (err) {
    return true;
  }
};
