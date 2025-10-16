import mongoose, { Schema, Document } from "mongoose";

export interface ISpin extends Document {
  spinId: string;
  userId: mongoose.Types.ObjectId;
  symbols: string[];
  wager: number;
  winAmount: number;
  balanceAfter: number;
  timestamp: Date;
}

const spinSchema = new Schema<ISpin>(
  {
    spinId: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    symbols: { type: [String], required: true },
    wager: { type: Number, required: true },
    winAmount: { type: Number, required: true },
    balanceAfter: { type: Number, required: true },
    timestamp: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Spin = mongoose.model<ISpin>("Spin", spinSchema);
