// frontend/app/admin/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AdminDashboard } from "@/components/Admin/AdminDashboard";

export default function AdminPage() {
  const { token, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token || user?.role !== "admin") router.push("/"); // only admin access
  }, [token, user, router]);

  return (
    <div>
      <AdminDashboard />
    </div>
  );
}
