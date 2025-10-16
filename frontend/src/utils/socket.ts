// frontend/src/utils/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (token: string) => {
  if (!socket) {
    socket = io("http://localhost:3000", {
      auth: { token },
    });

    socket.on("connect", () => {
      console.log("Socket connected", socket?.id);
    });

    socket.on("balanceUpdate", (balance: number) => {
      // Optionally update GameContext directly here if needed
      console.log("Balance updated", balance);
    });

    socket.on("leaderboardUpdate", (data: any) => {
      console.log("Leaderboard updated", data);
      // Update state if needed
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  }
  return socket;
};

export const getSocket = () => socket;
