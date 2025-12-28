import Cookies from "js-cookie";

const TOKEN_KEY = "token";

export const setToken = (token: string, options?: Cookies.CookieAttributes) => {
    Cookies.set(TOKEN_KEY, token, {
        expires: 7,
        path: "/",
        sameSite: "strict",
        ...options,
    });
};

export const getToken = (): string | undefined => {
    return Cookies.get(TOKEN_KEY);
};

export const removeToken = () => {
    Cookies.remove(TOKEN_KEY, { path: "/" });
};

export const isAuthenticated = (): boolean => {
    const token = getToken();
    return !!token;
};
