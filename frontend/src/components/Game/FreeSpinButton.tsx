// frontend/src/components/Game/FreeSpinButton.tsx
"use client";

import React, { useEffect, useState } from "react";
import { getSocket } from "../../utils/socket";
import { useGame } from "../../context/GameContext";

export const FreeSpinButton = () => {
  const [cooldown, setCooldown] = useState(0); // seconds remaining
  const { setBalance } = useGame();

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    // Request cooldown on load
    socket.emit("freeSpinStatus", null, (res: any) => {
      if (res.success) setCooldown(res.cooldown);
    });

    // Listen for freeSpinResult
    socket.on("freeSpinResult", (res: any) => {
      if (res.success) {
        setBalance(res.result.balanceAfter);
        alert(`Free Spin Result: ${res.result.symbols.join(" ")} | Win: $${res.result.winAmount}`);
        setCooldown(3600); // start 1 hour cooldown
      } else {
        alert(res.error);
      }
    });

    return () => {
      socket.off("freeSpinResult");
    };
  }, [setBalance]);

  // Countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => setCooldown(prev => Math.max(prev - 1, 0)), 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const handleFreeSpin = () => {
    const socket = getSocket();
    if (!socket) return alert("Socket not connected");
    if (cooldown > 0) return;

    socket.emit("freeSpin", null);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <button
        onClick={handleFreeSpin}
        disabled={cooldown > 0}
        style={{ padding: "10px 20px", fontSize: "1.2rem", cursor: cooldown > 0 ? "not-allowed" : "pointer" }}
      >
        {cooldown > 0 ? `Free Spin available in ${formatTime(cooldown)}` : "Claim Free Spin 🎁"}
      </button>
    </div>
  );
};
