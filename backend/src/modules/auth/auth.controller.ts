import { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service";
import { verifyRefreshToken, signAccessToken, verifyAccessToken } from "../../utils/jwt";
import redisClient from "../../config/redis";
import { User } from "../user/user.model";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await registerUser(username, password);
    res.json({ success: true, user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const data = await loginUser(username, password);
    res.json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const userDataController = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new Error("No authorization header");
    const token = authHeader.split(" ")[1];
    if (!token) throw new Error("No token provided");

    const payload: any = verifyAccessToken(token);
    if (!payload) throw new Error("Invalid token");

    const user = await User.findById(payload._id).select("-password");
    if (!user) throw new Error("User not found");

    res.json({ user });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};

export const refreshController = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new Error("No refresh token provided");

    const payload: any = verifyRefreshToken(refreshToken);
    const stored = await redisClient.get(`refresh:${payload._id}`);
    if (stored !== refreshToken) throw new Error("Invalid refresh token");

    const accessToken = signAccessToken({ _id: payload._id, username: payload.username });
    res.json({ accessToken });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};
