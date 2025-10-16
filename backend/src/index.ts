import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

import { connectMongo } from "./config/mongo";
import redisClient from "./config/redis";

import authRoutes from "./modules/auth/auth.routes";
import leaderboardRoutes from "./modules/leaderboard/leaderboard.routes";
import { gameSocket } from "./modules/game/game.socket";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes 
app.get('/', (req, res) => res.send('Casino Backend is running'));
app.use("/auth", authRoutes);
app.use("/leaderboard", leaderboardRoutes);

// Start server + Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Attach game sockets
gameSocket(io);

const PORT = process.env.PORT || 7070;

// Connect MongoDB and Redis, then start server
const start = async () => {
  await connectMongo();
  redisClient.on("connect", () => console.log("✅ Redis ready"));
  server.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
};

start();
