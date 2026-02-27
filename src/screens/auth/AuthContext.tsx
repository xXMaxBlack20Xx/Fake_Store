// src/auth/AuthContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { login as apiLogin, logout as apiLogout, getStoredToken } from "../../api/auth/auth";
import type { LoginRequest } from "../../api/types/loginTypes";

type AuthContextValue = {
    token: string | null;
    isAuthenticated: boolean;
    restoring: boolean;
    signIn: (username: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [restoring, setRestoring] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const t = await getStoredToken();
                setToken(t);
            } finally {
                setRestoring(false);
            }
        })();
    }, []);

    const signIn = async (username: string, password: string) => {
        const payload: LoginRequest = { username, password };
        const res = await apiLogin(payload); // this saves token in SecureStore already
        setToken(res.token);                 // this updates app state immediately
    };

    const signOut = async () => {
        await apiLogout();
        setToken(null);
    };

    const value = useMemo(
        () => ({
            token,
            restoring,
            isAuthenticated: !!token,
            signIn,
            signOut,
        }),
        [token, restoring]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}