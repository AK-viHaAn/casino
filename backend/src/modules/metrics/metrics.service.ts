import { User } from "../user/user.model";

export const trackSpinMetrics = async (userId: string, wager: number, winAmount: number) => {
  const user = await User.findById(userId);
  if (!user) return;

  user.totalSpins += 1;
  user.totalWagered += wager;
  user.totalWon += winAmount;
  await user.save();
};

export const startSession = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) return;
  user.set("sessionStart", new Date());
  await user.save();
};

export const endSession = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) return;
  user.set("sessionEnd", new Date());
  await user.save();
};
