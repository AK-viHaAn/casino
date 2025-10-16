import { Server, Socket } from "socket.io";
import { socketAuth } from "../../middlewares/socketAuth";
import { rateLimiter } from "../../middlewares/rateLimiter";
import { User } from "../user/user.model";
import { performSpin } from "./spin.logic";
import { Spin } from "../spin/spin.model";

export const gameSocket = (io: Server) => {
  io.use(socketAuth); // Verify JWT
  io.on("connection", (socket: Socket) => {
    const userId = socket.data.user._id;
    console.log(`User connected: ${userId}`);

    // Spin event
    socket.on("spin", async (wager: number, callback) => {
      try {
        const rateLimitReached = await rateLimiter(socket, callback);
        if (rateLimitReached) throw new Error("Rate limit exceeded");
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        const result = await performSpin(user, wager);
        await Spin.create(result); // Save spin record
        
        callback({ success: true, result });
      } catch (err: any) {
        callback({ success: false, error: err.message });
      }
    });

    // Balance event
    socket.on("balance", async (callback) => {
      try {
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");
        callback({ balance: user.balance });
      } catch (err: any) {
        callback({ error: err.message });
      }
    });

    // Transactions event (paginated)
    socket.on("transactions", async ({ page = 1, limit = 10 }, callback) => {
      try {
        const spins = await (await import("../spin/spin.model")).Spin.find({ userId })
          .sort({ timestamp: -1 })
          .skip((page - 1) * limit)
          .limit(limit);
        callback({ success: true, data: spins });
      } catch (err: any) {
        callback({ success: false, error: err.message });
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${userId}`);
    });
  });
};
