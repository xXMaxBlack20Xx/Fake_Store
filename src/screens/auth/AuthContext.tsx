import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authApi, HttpError } from "../../api";

type AuthContextValue = {
    token: string | null;
    isLoading: boolean;
    isAuthed: boolean;
    signIn: (username: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const t = await authApi.getStoredToken();
            setToken(t);
            setIsLoading(false);
        })();
    }, []);

    const value = useMemo<AuthContextValue>(() => ({
        token,
        isLoading,
        isAuthed: !!token,
        signIn: async (username, password) => {
            const res = await authApi.login({ username, password });
            setToken(res.token);
        },
        signOut: async () => {
            await authApi.logout();
            setToken(null);
        },
    }), [token, isLoading]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within <AuthProvider />");
    return ctx;
}