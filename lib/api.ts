const BASE_URL = "https://tinytales.trendline.marketing/api";

export async function apiRequest(endpoint: string, options: RequestInit) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        ...options,
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message || "Something went wrong");
    }

    return data;
}
