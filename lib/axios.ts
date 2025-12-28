import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "https://tinytales.trendline.marketing/api";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            switch (status) {
                case 401:
                    Cookies.remove("token");
                    localStorage.removeItem("user");

                    if (
                        typeof window !== "undefined" &&
                        !window.location.pathname.includes("/login")
                    ) {
                        const lang =
                            window.location.pathname.split("/")[1] || "en";
                        window.location.href = `/${lang}/login`;
                    }
                    break;

                case 403:
                    console.error("Access forbidden");
                    break;

                case 404:
                    console.error("Resource not found");
                    break;

                case 500:
                    console.error("Server error");
                    break;
            }

            return Promise.reject({
                message: data?.message || "Something went wrong",
                status,
                data,
            });
        } else if (error.request) {
            return Promise.reject({
                message: "Network error. Please check your connection.",
                status: 0,
            });
        } else {
            return Promise.reject({
                message: error.message || "An unexpected error occurred",
                status: 0,
            });
        }
    }
);

export default axiosInstance;
