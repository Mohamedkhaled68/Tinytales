"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "../../dictionaries";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>(
        {}
    );
    const [dic, setDic] = useState<any>(null);

    const { lang } = useParams<{ lang: "en" | "ar" }>();

    const { loginUser, isLoading } = useAuth();

    const getDic = async () => {
        const dictionary = await getDictionary(lang);
        setDic(dictionary);
    };

    useEffect(() => {
        getDic();
    }, [lang]);

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

    const validatePassword = (password: string) => {
        if (!password) {
            return dic?.auth.validation.password_required;
        }
        if (password.length < 8) {
            return dic?.auth.validation.password_min_length;
        }
        return "";
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        setErrors({ ...errors, email: "" });
    };

    const handleEmailBlur = () => {
        const emailError = validateEmail(email);
        setErrors({ ...errors, email: emailError });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        setErrors({ ...errors, password: "" });
    };

    const handlePasswordBlur = () => {
        const passwordError = validatePassword(password);
        setErrors({ ...errors, password: passwordError });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
            return;
        }

        setErrors({});

        try {
            await loginUser(email, password, lang);
            toast.success(dic?.auth.login.success_message);
        } catch (err: any) {
            console.log("Login error:", err.message);
        }
    };

    return (
        <div className="bg-white z-10 w-full md:w-120 mx-auto rounded-[40px] p-6 shadow-[0_0_140px_-56px_rgba(0,0,0,0.25)]">
            <div className="flex flex-col">
                <div className="flex flex-col items-center gap-2">
                    <div className="relative w-19 h-14.75">
                        <Image src={"/images/logo.svg"} alt="logo" fill />
                    </div>
                    <p className="text-tiny-black-200 text-xs font-normal font-poppins-regular">
                        {dic?.auth.login.header_message}
                    </p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col mt-4">
                    <div className="relative">
                        <label
                            htmlFor="email"
                            className={`absolute -top-2 ${
                                lang === "ar" ? "right-3" : "left-3"
                            } font-normal font-poppins-regular text-xs text-tiny-black bg-white px-2`}
                        >
                            {dic?.auth.login.email}
                        </label>
                        <input
                            type="email"
                            className={`rounded-[10px] border-[0.5px] ${
                                errors.email
                                    ? "border-red-500"
                                    : "border-black/15"
                            } font-medium font-poppins-medium text-xs text-tiny-black px-5 py-3.5 w-full outline-none`}
                            name="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={handleEmailBlur}
                            placeholder={dic?.auth.login.email_placeholder}
                            disabled={isLoading}
                        />
                        {errors.email && (
                            <p className="text-xs text-red-600 font-poppins-regular mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <div className="relative mt-8">
                        <label
                            htmlFor="password"
                            className={`absolute -top-2 ${
                                lang === "ar" ? "right-3" : "left-3"
                            } font-normal font-poppins-regular text-xs text-tiny-black bg-white px-2`}
                        >
                            {dic?.auth.login.password}
                        </label>
                        <input
                            type="password"
                            className={`rounded-[10px] border-[0.5px] ${
                                errors.password
                                    ? "border-red-500"
                                    : "border-black/15"
                            } font-medium font-poppins-medium text-xs text-tiny-black px-5 py-3.5 w-full outline-none`}
                            name="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            onBlur={handlePasswordBlur}
                            placeholder={dic?.auth.login.password_placeholder}
                            disabled={isLoading}
                        />
                        {errors.password && (
                            <p className="text-xs text-red-600 font-poppins-regular mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <Link
                        className={`text-tiny-pink text-sm font-semibold font-poppins-semi-bold ${
                            lang === "ar" ? "text-left" : "text-right"
                        }  mt-5`}
                        href={`/${lang}/forgot-password`}
                    >
                        {dic?.auth.login.forgot_password}
                    </Link>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="cursor-pointer mt-3 py-4 w-full bg-tiny-pink text-center text-white text-sm font-semibold font-poppins-semi-bold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-90 transition-all"
                    >
                        {isLoading
                            ? dic?.auth.login.logging_in
                            : dic?.auth.login.login}
                    </button>
                </form>

                <div className="flex items-center my-2">
                    <div className="h-0.5 w-full bg-[#ECECEC] rounded-2xl" />
                    <span className="p-2 text-sm font-medium font-poppins-medium">
                        {dic?.auth.login.or}
                    </span>
                    <div className="h-0.5 w-full bg-[#ECECEC] rounded-2xl" />
                </div>

                <Link
                    href={`/${lang}/register`}
                    className="cursor-pointer py-4 w-full border-[0.5px] border-tiny-pink rounded-2xl flex justify-center flex-wrap"
                >
                    <span className="text-sm text-tiny-black font-poppins-regular font-normal">
                        {dic?.auth.login.dont_have_acc}
                    </span>
                    <span className="text-sm text-tiny-pink font-semibold font-poppins-semi-bold">
                        {dic?.auth.login.signup_now}
                    </span>
                </Link>
            </div>
        </div>
    );
}
