import axiosInstance from "@/lib/axios";
import { User } from "@/store/authStore";

interface AuthResponse {
    message: string;
    data: {
        token: string;
        user?: User;
        [key: string]: any;
    };
}

interface MessageResponse {
    message: string;
    data?: any;
}

export const login = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    return axiosInstance.post("/auth/login", { email, password });
};

export const register = async (userData: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    mobile: string;
    mobile_country_code: string;
}): Promise<AuthResponse> => {
    return axiosInstance.post("/auth/register", userData);
};

export const verifyEmail = async (code: string): Promise<MessageResponse> => {
    return axiosInstance.post("/auth/verify-email", { code });
};

export const resendVerificationCode = async (): Promise<MessageResponse> => {
    return axiosInstance.post("/auth/verify-email/resend-code");
};

export const checkEmailForReset = async (
    email: string
): Promise<MessageResponse> => {
    return axiosInstance.post("/forget-password/check-email", { email });
};

export const verifyResetOTP = async (
    email: string,
    otp: string
): Promise<MessageResponse> => {
    return axiosInstance.post("/forget-password/check-otp", { email, otp });
};

export const resetPassword = async (resetData: {
    email: string;
    otp: string;
    password: string;
    password_confirmation: string;
}): Promise<MessageResponse> => {
    return axiosInstance.post("/forget-password/reset-password", resetData);
};

export const logout = async (): Promise<MessageResponse> => {
    return axiosInstance.post("/auth/logout");
};
