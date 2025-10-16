import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  balance: number;
  totalSpins: number;
  totalWon: number;
  totalWagered: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 1000 },
    totalSpins: { type: Number, default: 0 },
    totalWon: { type: Number, default: 0 },
    totalWagered: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
