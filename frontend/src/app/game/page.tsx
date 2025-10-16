"use client";

import { BalanceDisplay } from "@/components/Game/BalanceDisplay";
import { SlotMachine } from "@/components/Game/SlotMachine";
import { SpinButton } from "@/components/Game/SpinButton";
import { useAuth } from "@/context/AuthContext";
import { connectSocket } from "@/utils/socket";
import { useEffect } from "react";
import LeaderboardPage from "../leaderboard/page";
import { useRouter } from "next/navigation";
import { Transactions } from "@/components/Game/Transactions";
import { FreeSpinButton } from "@/components/Game/FreeSpinButton";

export default function GamePage() {
  const { token } = useAuth();
    const router = useRouter();

  useEffect(() => {
    if (token) {connectSocket(token)}
    else { router.push("/") };
  }, [token]);

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-black to-red-900 flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-5xl font-bold text-yellow-400 mb-8 animate-pulse">
        🎰 Slot Machine 🎰
      </h1>
      
      <BalanceDisplay />

      <SlotMachine />

      <SpinButton wager={10} />
      <FreeSpinButton />
      <Transactions />
    </div>
  );
}
