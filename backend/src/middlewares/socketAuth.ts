import { Socket } from "socket.io";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "myjwtsecret";

export const socketAuth = (socket: Socket, next: (err?: any) => void) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) throw new Error("No token provided");

    const payload = jwt.verify(token, JWT_SECRET);
    socket.data.user = payload;
    next();
  } catch (err) {
    next(new Error("Unauthorized"));
  }
};
