// frontend/src/context/TransactionsContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Transaction {
  spinId: string;
  symbols: string[];
  wager: number;
  winAmount: number;
  balanceAfter: number;
  timestamp: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  addTransaction: (tx: Transaction) => void;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (tx: Transaction) => {
    setTransactions(prev => [tx, ...prev]);
  };

  return (
    <TransactionsContext.Provider value={{ transactions, setTransactions, addTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) throw new Error("useTransactions must be used within TransactionsProvider");
  return context;
};
