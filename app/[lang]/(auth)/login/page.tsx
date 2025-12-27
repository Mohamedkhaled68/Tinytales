"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "../../dictionaries";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dic, setDic] = useState<any>(null);

    const { lang } = useParams<{ lang: "en" | "ar" }>();

    const getDic = async () => {
        const dictionary = await getDictionary(lang);
        setDic(dictionary);
    };

    useEffect(() => {
        getDic();
    }, [lang]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await apiRequest("/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });

            document.cookie = `token=${res.data.token}; path=/`;
            localStorage.setItem("user", JSON.stringify(res.data));

            toast.success("Logged in Successfully");

            router.push(`/${lang}/dashboard`);
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white z-10 w-full lg:w-100 mx-auto rounded-[40px] p-6 shadow-[0_0_140px_-56px_rgba(0,0,0,0.25)]">
            <div className="flex flex-col">
                <div className="flex flex-col items-center gap-2">
                    <div className="relative w-19 h-14.75">
                        <Image src={"/images/logo.svg"} alt="logo" fill />
                    </div>
                    <p className="text-tiny-black-200 text-xs font-normal font-poppins-regular">
                        {dic?.auth.login.header_message}
                    </p>
                </div>

                <div className="flex flex-col mt-4">
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
                            className="rounded-[10px] border-[0.5px] border-black/15 font-medium font-poppins-medium text-xs text-tiny-black px-5 py-3.5 w-full outline-none"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={dic?.auth.login.email_placeholder}
                            disabled={loading}
                        />
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
                            className="rounded-[10px] border-[0.5px] border-black/15 font-medium font-poppins-medium text-xs text-tiny-black px-5 py-3.5 w-full outline-none"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={dic?.auth.login.password_placeholder}
                            disabled={loading}
                        />
                    </div>

                    {error && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-xs text-red-600 font-poppins-regular">
                                {error}
                            </p>
                        </div>
                    )}

                    <Link
                        className={`text-tiny-pink text-sm font-semibold font-poppins-semi-bold ${
                            lang === "ar" ? "text-left" : "text-right"
                        }  mt-5`}
                        href={`/${lang}/forgot-password`}
                    >
                        {dic?.auth.login.forgot_password}
                    </Link>

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="cursor-pointer mt-3 py-4 w-full bg-tiny-pink text-center text-white text-sm font-semibold font-poppins-semi-bold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-90 transition-all"
                    >
                        {loading ? "Loading..." : dic?.auth.login.login}
                    </button>
                </div>

                <div className="flex items-center my-2">
                    <div className="h-0.5 w-full bg-[#ECECEC] rounded-2xl" />
                    <span className="p-2 text-sm font-medium font-poppins-medium">
                        {dic?.auth.login.or}
                    </span>
                    <div className="h-0.5 w-full bg-[#ECECEC] rounded-2xl" />
                </div>

                <Link
                    href={`/${lang}/register`}
                    className="cursor-pointer py-4 w-full border-[0.5px] border-tiny-pink rounded-2xl flex justify-center"
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
