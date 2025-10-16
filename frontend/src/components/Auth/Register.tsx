import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../utils/api";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", { username, password });
      alert("Registered successfully!");
      router.push("/");
    } catch (err: any) {
      alert(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-black to-red-900 flex items-center justify-center">
      <div className="bg-black/80 border-4 border-yellow-400 rounded-3xl p-10 w-96 text-center shadow-lg shadow-yellow-500/50">
        <h1 className="text-4xl font-bold text-yellow-400 mb-6 animate-pulse">
          🎰 Casino Register 🎰
        </h1>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-black border-2 border-yellow-400 text-yellow-300 placeholder-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 rounded-lg bg-black border-2 border-yellow-400 text-yellow-300 placeholder-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg shadow-lg transition duration-300"
        >
          Register
        </button>

        <p className="text-yellow-300 mt-4 text-sm">
          Already have an account? <span className="text-red-400 cursor-pointer" onClick={() => router.push("/")}>Login</span>
        </p>
      </div>
    </div>
  );
};
