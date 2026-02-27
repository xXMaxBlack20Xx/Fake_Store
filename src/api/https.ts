import { API_BASE_URL } from "./config";
import { getToken } from "./tokenStore";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = {
    method?: HttpMethod;
    body?: unknown;
    auth?: boolean; // attach token if true
    headers?: Record<string, string>;
};

export class HttpError extends Error {
    status: number;
    body: unknown;

    constructor(status: number, message: string, body: unknown) {
        super(message);
        this.status = status;
        this.body = body;
    }
}

export async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
    const {
        method = "GET",
        body,
        auth = false,
        headers = {},
    } = opts;

    const url = `${API_BASE_URL}${path}`;

    const finalHeaders: Record<string, string> = {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
    };

    if (auth) {
        const token = await getToken();
        if (token) finalHeaders.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(url, {
        method,
        headers: finalHeaders,
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    // Try to parse JSON, but don’t crash if response is empty/non-JSON
    const text = await res.text();
    const data = text ? safeJsonParse(text) : null;

    if (!res.ok) {
        const message =
            typeof data === "object" && data && "message" in (data as any)
                ? String((data as any).message)
                : `Request failed with status ${res.status}`;
        throw new HttpError(res.status, message, data);
    }

    return data as T;
}

function safeJsonParse(text: string) {
    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
}