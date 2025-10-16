// frontend/app/metrics/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Metrics } from "@/components/Metrics/Metrics";

export default function MetricsPage() {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push("/"); // redirect if not logged in
  }, [token, router]);

  return (
    <div>
      <Metrics />
    </div>
  );
}
