"use client";

import React from "react";
import { useGame } from "../../context/GameContext";

export const BalanceDisplay = () => {
  const { balance } = useGame();

  return (
    <div style={{ fontSize: "1.5rem", margin: "10px 0" }}>
      💰 Balance: ${balance?.toFixed(2)}
    </div>
  );
};
