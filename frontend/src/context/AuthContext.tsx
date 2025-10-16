// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api } from "../utils/api";

interface User {
    _id: string;
    username: string;
    balance: number;
    totalSpins: number;
    totalWon: number;
    totalWagered: number;
    role: "user" | "admin";
}

interface AuthContextType {
    token: string | null;
    user: User | null;
    setToken: (token: string | null) => void;
    setUser: (user: User | null) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    // Restore token and user from localStorage
    useEffect(() => {
        const restoreAuth = async () => {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                
                // Optionally fetch user from backend if needed
                await api.get("/auth/me", { headers: { Authorization: `Bearer ${storedToken}` } })
                    .then(res => {
                        setUser(res.data.user)
                    })
                    .catch(() => logout());
            }
        };
        restoreAuth();
    }, []);

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ token, user, setToken, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
