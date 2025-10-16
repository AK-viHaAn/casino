// frontend/src/components/Game/SlotMachine.tsx
"use client";

import React, { useState } from "react";

const SYMBOLS = ["🍒", "🍋", "🍉", "⭐", "🔔", "💎"];

export const SlotMachine = () => {
  const [reels, setReels] = useState(["-", "-", "-"]);

  return (
    <>
      <div style={{ fontSize: "3rem", margin: "20px 0", display: "flex", justifyContent: "center", gap: "20px" }} className="slot-reel">
        {reels.map((symbol, idx) => (
          <span key={idx}>{symbol}</span>
        ))}
      </div>
      <div className="slot-reel-result" style={{ marginTop: "20px", fontSize: "1.5rem" }}></div>
    </>
  );
};
