import { Request, Response } from "express";
import { Spin } from "../spin/spin.model";
import redisClient from "../../config/redis";
import mongoose from "mongoose";

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const days = Number(req.query.days) || 1;
    const cacheKey = `leaderboard:${days}`;

    // Check Redis cache
    const cached = await redisClient.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    // Calculate date filter
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);

    // MongoDB aggregation
    const leaderboard = await Spin.aggregate([
      { $match: { timestamp: { $gte: fromDate } } },
      {
        $group: {
          _id: "$userId",
          netWin: { $sum: { $subtract: ["$winAmount", "$wager"] } },
        },
      },
      { $sort: { netWin: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          username: "$user.username",
          netWin: 1,
        },
      },
    ]);

    // Store in Redis for 2 minutes
    await redisClient.set(cacheKey, JSON.stringify(leaderboard), { EX: 120 });

    res.json(leaderboard);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
