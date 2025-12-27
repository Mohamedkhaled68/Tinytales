"use client";

import { useState, useRef, KeyboardEvent, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import { getTokenFromCookie } from "@/utils/helpers";
import { FaAngleLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import { FaAngleRight } from "react-icons/fa6";
import Link from "next/link";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface OtpFormParams {
    type?: "reset" | "verify";
    setStep?: React.Dispatch<React.SetStateAction<string>>;
}

export default function OtpForm({ type, setStep }: OtpFormParams) {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState<any>("");
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const [dic, setDic] = useState<any>(null);

    const { lang } = useParams<{ lang: "en" | "ar" }>();

    const getDic = async () => {
        const dictionary = await getDictionary(lang);
        setDic(dictionary);
    };

    useEffect(() => {
        getDic();
    }, [lang]);

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) {
            value = value[0];
        }

        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        index: number,
        e: KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);

        if (!/^\d+$/.test(pastedData)) return;

        const newCode = [...code];
        for (let i = 0; i < pastedData.length; i++) {
            newCode[i] = pastedData[i];
        }
        setCode(newCode);

        const nextEmpty = pastedData.length < 6 ? pastedData.length : 5;
        inputRefs.current[nextEmpty]?.focus();
    };

    const handleVerify = async () => {
        const fullCode = code.join("");

        if (fullCode.length !== 6) {
            setError("Please enter all 6 digits");
            return;
        }

        setLoading(true);
        setError("");

        const token = getTokenFromCookie();

        if (type === "reset") {
            try {
                const email = localStorage.getItem("email_recovery");
                const res = await apiRequest("/forget-password/check-otp", {
                    method: "POST",
                    body: JSON.stringify({ otp: fullCode, email }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                localStorage.setItem("otp", fullCode);

                if (setStep) {
                    setStep("reset");
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        } else {
            try {
                const res = await apiRequest("/auth/verify-email", {
                    method: "POST",
                    body: JSON.stringify({ code: fullCode }),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("Verification response:", res);

                toast.success("Account verified Successfully");

                router.push(`/${lang}/login`);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleResend = async () => {
        try {
            setLoading(true);
            setError("");

            setCode(["", "", "", "", "", ""]);
            inputRefs.current[0]?.focus();

            await apiRequest("/auth/verify-email/resend-code", {
                method: "POST",
            });
        } catch (err: any) {
            setError(err.message || "Failed to resend code");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const user = localStorage.getItem("user");

        if (user) {
            try {
                const parsedUser = JSON.parse(user);
                setUserEmail(parsedUser?.email);
            } catch (error) {
                console.error("Failed to parse user data:", error);
            }
        }
    }, []);

    return (
        <div className="bg-white z-10 w-full lg:w-110 mx-auto rounded-[40px] p-6 shadow-[0_0_140px_-56px_rgba(0,0,0,0.25)]">
            <div className="flex flex-col">
                <div className="flex flex-col items-center gap-2">
                    <div className="flex justify-start items-start w-full">
                        {type === "reset" ? (
                            <>
                                <button
                                    onClick={() => setStep && setStep("email")}
                                    className="cursor-pointer rounded-xl flex justify-center items-center border border-[#0000001A] p-2 hover:bg-gray-50 transition-colors"
                                >
                                    {lang === "ar" ? (
                                        <FaAngleRight />
                                    ) : (
                                        <FaAngleLeft />
                                    )}
                                </button>
                            </>
                        ) : (
                            <Link
                                href={`/${lang}/register`}
                                className="cursor-pointer rounded-xl flex justify-center items-center border border-[#0000001A] p-2 hover:bg-gray-50 transition-colors"
                            >
                                {lang === "ar" ? (
                                    <FaAngleRight />
                                ) : (
                                    <FaAngleLeft />
                                )}
                            </Link>
                        )}
                    </div>
                    <h1 className="text-[16px] lg:text-2xl font-medium font-poppins-medium text-tiny-black">
                        {dic?.auth.verify.verify_id}
                    </h1>
                    <div className="flex flex-col items-center gap-1">
                        <p className="text-tiny-black-200 text-xs lg:text-[16px] font-normal font-poppins-regular text-center">
                            {dic?.auth.verify.sent_message}
                        </p>
                        <p className="text-tiny-black text-xs lg:text-[16px] font-medium font-poppins-medium text-center">
                            {userEmail}
                        </p>
                        <p className="text-tiny-black-200 text-xs lg:text-[16px] font-normal font-poppins-regular text-center">
                            {dic?.auth.verify.code_valid}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col mt-5">
                    {/* OTP Input Fields */}
                    <div
                        className={`flex justify-center gap-2 mb-6 ${
                            lang === "ar" ? "flex-row-reverse" : ""
                        }`}
                    >
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    inputRefs.current[index] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) =>
                                    handleChange(index, e.target.value)
                                }
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="w-10 lg:w-12 h-13 text-center text-2xl font-semibold font-poppins-semi-bold border-[0.5px] border-black/15 rounded-[18px] lg:rounded-[20px] outline-none focus:border-tiny-pink focus:ring-2 focus:ring-tiny-pink/20 transition-all"
                            />
                        ))}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-xs text-red-600 font-poppins-regular text-center">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Verify Button */}
                    <button
                        onClick={handleVerify}
                        disabled={loading || code.some((digit) => !digit)}
                        className="py-4 w-full bg-tiny-pink text-center text-white text-sm font-semibold font-poppins-semi-bold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-90 transition-all"
                    >
                        {loading ? "Verifying..." : dic?.auth.verify.send_code}
                    </button>

                    {/* Resend Code */}
                    <button
                        onClick={handleResend}
                        disabled={loading}
                        className="mt-4 font-medium font-poppins-medium text-sm lg:text-[16px] text-tiny-black-200 text-center hover:text-tiny-pink transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {dic?.auth.verify.resend_code}
                    </button>
                </div>
            </div>
        </div>
    );
}
