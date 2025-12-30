import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import * as authService from "@/services/authService";
import { setToken, removeToken } from "@/lib/token";
import toast from "react-hot-toast";

export const useAuth = () => {
    const router = useRouter();
    const { user, isAuthenticated, isLoading, login, logout, setLoading } =
        useAuthStore();

    const loginUser = async (
        email: string,
        password: string,
        lang: string = "en"
    ) => {
        try {
            setLoading(true);

            const response = await authService.login(email, password);

            setToken(response.data.token);

            login(response.data as any);

            router.push(`/${lang}/profile`);

            return response;
        } catch (error: any) {
            toast.error(error.message || "Login failed");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const registerUser = async (
        userData: {
            name: string;
            email: string;
            password: string;
            password_confirmation: string;
            mobile: string;
            mobile_country_code: string;
        },
        lang: string = "en"
    ) => {
        try {
            setLoading(true);

            const response = await authService.register(userData);

            setToken(response.data.token);

            login(response.data as any);

            router.push(`/${lang}/verify/verify-user-email`);

            return response;
        } catch (error: any) {
            toast.error(error.message || "Registration failed");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logoutUser = async (lang: string = "en") => {
        try {
            removeToken();

            logout();

            router.push(`/${lang}`);
        } catch (error: any) {
            toast.error(error.message || "Logout failed");
            throw error;
        }
    };

    const verifyUserEmail = async (code: string, lang: string = "en") => {
        try {
            setLoading(true);

            const response = await authService.verifyEmail(code);

            router.push(`/${lang}/login`);

            return response;
        } catch (error: any) {
            toast.error(error.message || "Verification failed");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const resendVerificationCode = async () => {
        try {
            setLoading(true);

            const response = await authService.resendVerificationCode();

            return response;
        } catch (error: any) {
            toast.error(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const checkEmailForReset = async (email: string) => {
        try {
            setLoading(true);

            const response = await authService.checkEmailForReset(email);

            return response;
        } catch (error: any) {
            toast.error(error.message || "Failed to send verification code");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const verifyResetOTP = async (email: string, otp: string) => {
        try {
            setLoading(true);

            const response = await authService.verifyResetOTP(email, otp);

            return response;
        } catch (error: any) {
            toast.error(error.message || "Invalid verification code");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (
        resetData: {
            email: string;
            otp: string;
            password: string;
            password_confirmation: string;
        },
        lang: string = "en"
    ) => {
        try {
            setLoading(true);

            const response = await authService.resetPassword(resetData);

            router.push(`/${lang}/login`);

            return response;
        } catch (error: any) {
            toast.error(error.message || "Failed to reset password");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        isAuthenticated,
        isLoading,

        loginUser,
        registerUser,
        logoutUser,
        verifyUserEmail,
        resendVerificationCode,
        checkEmailForReset,
        verifyResetOTP,
        resetPassword,
    };
};
