// src/context/GameContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface GameContextType {
  balance: number;
  setBalance: (balance: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState(0);
  const { user } = useAuth();

  // Update balance when user data changes
  useEffect(() => {
    if (user) {
      setBalance(user.balance);
    }
  }, [user]);

  return (
    <GameContext.Provider value={{ balance, setBalance }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within GameProvider");
  return context;
};
