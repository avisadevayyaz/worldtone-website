const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://192.168.18.99:3005";
export const baseUrl = "https://worldtone-server-production.up.railway.app";
// export const baseUrl = "https://worldtone-server-dev.up.railway.app";

export type ApiError = {
    status: number;
    message: string;
    details?: {
        error: string;
    };
};

async function apiFetch<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_BASE_URL}${path}`;
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };

    const res = await fetch(url, {
        ...options,
        headers,
    });

    if (!res.ok) {
        let message = "Something went wrong";
        try {
            const data = await res.json();
            message = data.message || message;
            throw { status: res.status, message, details: data } as ApiError;
        } catch (err) {
            if ("status" in (err as any)) throw err;
            throw { status: res.status, message } as ApiError;
        }
    }

    if (res.status === 204) return {} as T;
    return res.json() as Promise<T>;
}

export { apiFetch };