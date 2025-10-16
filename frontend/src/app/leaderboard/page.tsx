"use client";
import { Leaderboard } from "@/components/Leaderboard/Leaderboard";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LeaderboardPage() {
    const { token } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!token) router.push("/");
    }, [token, router]);
    
    return <Leaderboard />;
}