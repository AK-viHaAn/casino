// frontend/src/components/Header/Header.tsx
"use client";

import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useGame } from "../../context/GameContext";
import { useRouter } from "next/navigation";

export const Header = () => {
  const { user, logout, token } = useAuth();
  const { balance } = useGame();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/"); // redirect to login page
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#1a1a1a",
        color: "#fff",
      }}
    >
      <h2>🎰 Casino Slot Game</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {user && (
          <>
            <span>👤 {user.username}</span>
            <span>💰 Balance: ${balance?.toFixed(2)}</span>
            <button
              onClick={handleLogout}
              style={{
                padding: "5px 10px",
                backgroundColor: "#ff4d4d",
                border: "none",
                borderRadius: "5px",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};
