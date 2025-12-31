"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Link from "next/link";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

const AccountRecoveryForm = () => {
    const [dic, setDic] = useState<any>(null);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const router = useRouter();

    const { lang } = useParams<{ lang: "en" | "ar" }>();
    const { checkEmailForReset, isLoading } = useAuth();

    const getDic = async () => {
        const dictionary = await getDictionary(lang);
        setDic(dictionary);
    };

    const validateEmail = (email: string) => {
        if (!email.trim()) {
            return dic?.auth.validation.email_required;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return dic?.auth.validation.email_invalid;
        }
        return "";
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmailError("");
    };

    const handleEmailBlur = () => {
        const error = validateEmail(email);
        setEmailError(error);
    };

    const handleSubmit = async () => {
        const emailValidationError = validateEmail(email);

        if (emailValidationError) {
            setEmailError(emailValidationError);
            return;
        }

        setEmailError("");

        try {
            await checkEmailForReset(email);
            toast.success(dic?.auth.forgot_password.success_message);
            localStorage.setItem("user_email", email);
            localStorage.setItem("otp_status", "reset");
            router.push(`/${lang}/verify/verify-reset-password`);
        } catch (err: any) {
            // Error already handled by useAuth
        }
    };

    useEffect(() => {
        getDic();
    }, [lang]);

    return (
        <div className="bg-white z-10 w-full lg:w-100 mx-auto rounded-[40px] p-6 shadow-[0_0_140px_-56px_rgba(0,0,0,0.25)]">
            <div className="flex flex-col">
                <div className="flex flex-col items-center gap-2">
                    <div className="flex justify-start items-start w-full">
                        <Link
                            href={`/${lang}/login`}
                            className="cursor-pointer rounded-xl flex justify-center items-center border border-[#0000001A] p-2 hover:bg-gray-50 transition-colors"
                        >
                            {lang === "ar" ? <FaAngleRight /> : <FaAngleLeft />}
                        </Link>
                    </div>
                    <h1 className="text-[16px] lg:text-2xl font-medium font-poppins-medium text-tiny-black">
                        {dic?.auth.forgot_password.heading}
                    </h1>
                    <div className="flex flex-col items-center gap-1">
                        <p className="text-tiny-black-200 text-xs lg:text-[16px] font-normal font-poppins-regular text-center">
                            {dic?.auth.forgot_password.description}
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                    className="flex flex-col mt-4"
                >
                    <div className="relative">
                        <label
                            htmlFor="email"
                            className={`absolute -top-2 ${
                                lang === "ar" ? "right-3" : "left-3"
                            } font-normal font-poppins-regular text-xs text-tiny-black bg-white px-2`}
                        >
                            {dic?.auth.forgot_password.email}
                        </label>
                        <input
                            type="email"
                            className={`rounded-[10px] border-[0.5px] ${
                                emailError
                                    ? "border-red-500"
                                    : "border-black/15"
                            } font-medium font-poppins-medium text-xs text-tiny-black px-5 py-3.5 w-full outline-none`}
                            name="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={handleEmailBlur}
                            placeholder={
                                dic?.auth.forgot_password.email_placeholder
                            }
                            disabled={isLoading}
                        />
                        {emailError && (
                            <p className="text-xs text-red-600 font-poppins-regular mt-1">
                                {emailError}
                            </p>
                        )}
                    </div>

                    {error && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-xs text-red-600 font-poppins-regular">
                                {error}
                            </p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-3 py-4 w-full bg-tiny-pink text-center text-white text-sm font-semibold font-poppins-semi-bold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-90 transition-all"
                    >
                        {isLoading
                            ? dic?.auth.forgot_password.sending
                            : dic?.auth.forgot_password.send_code}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AccountRecoveryForm;
