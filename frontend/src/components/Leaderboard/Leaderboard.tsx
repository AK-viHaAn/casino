// frontend/src/components/Leaderboard/Leaderboard.tsx
"use client";

import React, { useEffect, useState } from "react";
import { api } from "../../utils/api";

interface Leader {
  username: string;
  netWin: number;
}

export const Leaderboard = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);

  const fetchLeaderboard = async () => {
    try {
      const res = await api.get("/leaderboard?days=1"); // Today leaderboard
      setLeaders(res.data);
    } catch (err: any) {
      console.error(err);
      alert("Failed to fetch leaderboard");
    }
  };

  useEffect(() => {
    fetchLeaderboard();

    // Optionally refresh every 2 minutes if cached in Redis
    const interval = setInterval(fetchLeaderboard, 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🏆 Leaderboard (Today)</h2>
      <ol>
        {leaders.map((l, i) => (
          <li key={i}>
            {l.username}: ${l.netWin?.toFixed(2)}
          </li>
        ))}
      </ol>
    </div>
  );
};
