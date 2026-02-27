import { request } from "./https";
import type { LoginRequest, LoginResponse } from "./types/loginTypes";
import { saveToken, deleteToken, getToken } from "./tokenStore";

export async function login(payload: LoginRequest): Promise<LoginResponse> {
    const res = await request<LoginResponse>("/auth/login", {
        method: "POST",
        body: payload,
    });

    // persist token
    await saveToken(res.token);
    return res;
}

export async function logout(): Promise<void> {
    await deleteToken();
}

export async function getStoredToken(): Promise<string | null> {
    return getToken();
}