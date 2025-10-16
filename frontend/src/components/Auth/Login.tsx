"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import { useGame } from "@/context/GameContext";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setToken, setUser } = useAuth();
  const { setBalance } = useGame();
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) return alert("Enter username and password");

    setLoading(true);
    try {
      // 1️⃣ Login request
      const res = await api.post("/auth/login", { username, password });
      const { accessToken, user } = res.data;

      // 2️⃣ Update AuthContext
      setToken(accessToken);
      setUser(user);
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      // 3️⃣ Update GameContext balance directly from user object
      setBalance(user.balance);

      // 4️⃣ Redirect to game page
      router.push("/game");
    } catch (err: any) {
      alert(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 to-pink-700 flex items-center justify-center">
      <div className="bg-black/70 p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-4xl text-yellow-400 font-bold mb-6 text-center">🎰 Casino Slot Login</h1>
        
        <input
          className="w-full p-3 mb-4 rounded-lg border border-yellow-400 bg-black text-yellow-400 placeholder-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <input
          type="password"
          className="w-full p-3 mb-6 rounded-lg border border-yellow-400 bg-black text-yellow-400 placeholder-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors duration-300 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-center text-yellow-200">
          Don’t have an account?{" "}
          <a href="/register" className="underline hover:text-white">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};
