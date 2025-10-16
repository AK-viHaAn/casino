"use client";

import { AuthProvider } from "@/context/AuthContext";
import { GameProvider } from "@/context/GameContext";
import { ReactNode } from "react";
import "./globals.css"; // <-- Add this line at the top
import { Header } from "@/components/Header/Header";
import { TransactionsProvider } from "@/context/TransactionsContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TransactionsProvider>
          <AuthProvider>
            <GameProvider>
              <Header />
              {children}
            </GameProvider>
          </AuthProvider>
        </TransactionsProvider>
      </body>
    </html>
  );
}
