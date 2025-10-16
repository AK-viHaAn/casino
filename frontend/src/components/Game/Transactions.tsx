"use client";

import React, { useEffect } from "react";
import { useTransactions } from "../../context/TransactionsContext";
import { getSocket } from "../../utils/socket";

export const Transactions = () => {
  const { transactions, addTransaction } = useTransactions();

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    // ✅ Listen for live spin results
    const handleSpinResult = (res: any) => {
      if (res.success) {
        addTransaction({
          spinId: res.result.spinId,
          symbols: res.result.symbols,
          wager: res.result.wager,
          winAmount: res.result.winAmount,
          balanceAfter: res.result.balanceAfter,
          timestamp: new Date(res.result.timestamp).toLocaleString(),
        });
      }
    };

    socket.on("spinResult", handleSpinResult);

    // ✅ Fetch initial transactions once
    socket.emit("transactions", { page: 1, limit: 20 }, (res: any) => {
      const spins = res?.data || res?.spins || [];
      spins.forEach((tx: any) =>
        addTransaction({
          spinId: tx.spinId,
          symbols: tx.symbols,
          wager: tx.wager,
          winAmount: tx.winAmount,
          balanceAfter: tx.balanceAfter,
          timestamp: new Date(tx.timestamp).toLocaleString(),
        })
      );
    });

    return () => {
      socket.off("spinResult", handleSpinResult);
    };
  }, []); // ✅ Only once

  return (
    <div className="w-full max-w-3xl mt-6 bg-black/40 rounded-2xl p-4 text-white shadow-lg backdrop-blur-md overflow-hidden">
      <h3 className="text-2xl font-semibold text-yellow-400 mb-4 text-center">
        📝 Spin History
      </h3>

      <div className="max-h-64 overflow-y-auto rounded-xl border border-gray-700">
        <table className="w-full text-sm text-center border-collapse">
          <thead className="bg-gray-800 text-yellow-300 sticky top-0">
            <tr>
              <th className="py-2 px-2">Time</th>
              <th className="py-2 px-2">Symbols</th>
              <th className="py-2 px-2">Wager</th>
              <th className="py-2 px-2">Win</th>
              <th className="py-2 px-2">Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-3 text-gray-400 italic">
                  No transactions yet
                </td>
              </tr>
            ) : (
              transactions.map((tx, idx) => (
                <tr
                  key={tx.spinId || idx}
                  className="border-b border-gray-700 hover:bg-gray-800/60 transition"
                >
                  <td className="py-2 px-2">
                    {new Date(tx.timestamp).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      hour12: true,
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-2 px-2">{tx.symbols.join(" ")}</td>
                  <td className="py-2 px-2">${tx.wager}</td>
                  <td
                    className={`py-2 px-2 ${
                      tx.winAmount > 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    ${tx.winAmount}
                  </td>
                  <td className="py-2 px-2">${tx.balanceAfter}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
