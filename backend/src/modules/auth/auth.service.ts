import bcrypt from "bcrypt";
import { User } from "../user/user.model";
import { signAccessToken, signRefreshToken } from "../../utils/jwt";
import redisClient from "../../config/redis";

export const registerUser = async (username: string, password: string) => {
  const exists = await User.findOne({ username });
  if (exists) throw new Error("Username already exists");

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashed });
  return user;
};

export const loginUser = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const accessToken = signAccessToken({ _id: user._id, username: user.username });
  const refreshToken = signRefreshToken({ _id: user._id, username: user.username });

  // Store refresh token in Redis
  await redisClient.set(`refresh:${user._id}`, refreshToken, { EX: 7 * 24 * 3600 });

  return { accessToken, refreshToken, user };
};
