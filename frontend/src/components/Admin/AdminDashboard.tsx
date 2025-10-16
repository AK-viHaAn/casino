// frontend/src/components/Admin/AdminDashboard.tsx
"use client";

import React, { useEffect, useState } from "react";
import { api } from "../../utils/api";

interface AdminMetrics {
  totalUsers: number;
  totalSpins: number;
  totalWagered: number;
  totalWon: number;
}

export const AdminDashboard = () => {
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);

  const fetchMetrics = async () => {
    try {
      const res = await api.get("/admin/metrics");
      setMetrics(res.data);
    } catch (err: any) {
      console.error(err);
      alert("Failed to fetch admin metrics");
    }
  };

  const resetLeaderboard = async () => {
    if (!confirm("Are you sure you want to reset the leaderboard?")) return;
    try {
      await api.post("/admin/reset-leaderboard");
      alert("Leaderboard reset successfully!");
    } catch (err: any) {
      console.error(err);
      alert("Failed to reset leaderboard");
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  if (!metrics) return <div>Loading admin metrics...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h3>Admin Metrics</h3>
      <ul>
        <li>Total Users: {metrics.totalUsers}</li>
        <li>Total Spins: {metrics.totalSpins}</li>
        <li>Total Wagered: ${metrics.totalWagered.toFixed(2)}</li>
        <li>Total Won: ${metrics.totalWon.toFixed(2)}</li>
      </ul>

      <button
        onClick={resetLeaderboard}
        style={{ marginTop: "20px", padding: "10px 20px", background: "red", color: "#fff", fontWeight: "bold" }}
      >
        Reset Leaderboard
      </button>
    </div>
  );
};
