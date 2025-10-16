import { IUser, User } from "../user/user.model";
import { v4 as uuidv4 } from "uuid";

// Define symbols and their weights
const symbols = [
  { symbol: "🍒", weight: 40 },
  { symbol: "🍋", weight: 30 },
  { symbol: "⭐", weight: 20 },
  { symbol: "💎", weight: 10 },
];

// Weighted random function
const getRandomSymbol = (): string => {
  const totalWeight = symbols.reduce((acc, s) => acc + s.weight, 0);
  let random = Math.random() * totalWeight;
  for (const s of symbols) {
    if (random < s.weight) return s.symbol;
    random -= s.weight;
  }
  return symbols[0].symbol;
};

// Spin logic
export const performSpin = async (user: IUser, wager: number) => {
  if (user.balance < wager) throw new Error("Insufficient balance");

  // Generate 3 reels
  const reels = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];

  // Basic payout rules: 3 identical symbols = 2x wager, else 0
  const winAmount = reels[0] === reels[1] && reels[1] === reels[2] ? wager * 2 : 0;

  // Update user
  user.balance = user.balance - wager + winAmount;
  user.totalSpins += 1;
  user.totalWagered += wager;
  user.totalWon += winAmount;
  await user.save();

  // Spin record
  const spinRecord = {
    spinId: uuidv4(),
    userId: user._id,
    symbols: reels,
    wager,
    winAmount,
    balanceAfter: user.balance,
    timestamp: new Date(),
  };

  return spinRecord;
};
