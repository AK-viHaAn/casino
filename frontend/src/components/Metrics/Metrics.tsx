// frontend/src/components/Metrics/Metrics.tsx
"use client";

import React, { useEffect, useState } from "react";
import { api } from "../../utils/api";

interface MetricsData {
  totalSpins: number;
  totalWagered: number;
  totalWon: number;
  averageSessionDuration: number; // in seconds
}

export const Metrics = () => {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);

  const fetchMetrics = async () => {
    try {
      const res = await api.get("/metrics");
      setMetrics(res.data);
    } catch (err: any) {
      console.error(err);
      alert("Failed to fetch metrics");
    }
  };

  useEffect(() => {
    fetchMetrics();

    // Optionally refresh every minute
    const interval = setInterval(fetchMetrics, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!metrics) return <div>Loading metrics...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Metrics Dashboard</h2>
      <ul>
        <li>Total Spins: {metrics.totalSpins}</li>
        <li>Total Wagered: ${metrics.totalWagered.toFixed(2)}</li>
        <li>Total Won: ${metrics.totalWon.toFixed(2)}</li>
        <li>
          Average Session Duration: {Math.floor(metrics.averageSessionDuration / 60)}m{" "}
          {metrics.averageSessionDuration % 60}s
        </li>
      </ul>
    </div>
  );
};
