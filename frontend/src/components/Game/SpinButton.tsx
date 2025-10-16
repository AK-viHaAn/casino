// frontend/src/components/Game/SpinButton.tsx
"use client";

import React, { useState } from "react";
import { useGame } from "../../context/GameContext";
import { getSocket } from "../../utils/socket";

interface SpinButtonProps {
  wager: number;
}

export const SpinButton = ({ wager }: SpinButtonProps) => {
  const [spinning, setSpinning] = useState(false);
  const { setBalance } = useGame();

  const handleSpin = () => {
    const socket = getSocket();
    if (!socket) return alert("Socket not connected");

    setSpinning(true);
    socket.emit("spin", wager, (res: any) => {
      setSpinning(false);
      if (res.success) {
        setBalance(res.result.balanceAfter);

        // Update reels visually
        const reelsContainer = document.querySelectorAll(".slot-reel span");
        if (reelsContainer.length) {
          res.result.symbols.forEach((s: string, i: number) => {
            (reelsContainer[i] as HTMLElement).textContent = s;
          });
        }

        // Show result
        const resultContainer = document.querySelector(".slot-reel-result");
        if (resultContainer) {
          (resultContainer as HTMLElement).innerHTML = `
            <p>Win: $${res.result.winAmount}</p>
          `;
        }
      } else {
        alert(res.error);
      }
    });
  };

  return (
    <button
      onClick={handleSpin}
      disabled={spinning}
      className="spin-button bg-yellow-400 text-black font-bold rounded-lg mt-4 hover:bg-yellow-500 transition"
      style={{ padding: "10px 20px", fontSize: "1.2rem", cursor: "pointer" }}
    >
      {spinning ? "Spinning..." : `Spin $${wager}`}
    </button>
  );
};
