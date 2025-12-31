"use client";

import { useState, useRef, KeyboardEvent, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { FaAngleLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import { FaAngleRight } from "react-icons/fa6";
import { getDictionary } from "@/app/[lang]/dictionaries";
import Link from "next/link";

export default function VerifyResetPasswordOtp() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState<string>("");
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [countdown, setCountdown] = useState(0);
    const [canEnterCode, setCanEnterCode] = useState(true);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const [dic, setDic] = useState<any>(null);

    const { lang } = useParams<{ lang: "en" | "ar" }>();
    const { verifyResetOTP, resendVerificationCode, isLoading } = useAuth();

    const getDic = async () => {
        const dictionary = await getDictionary(lang);
        setDic(dictionary);
    };

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) {
            value = value[0];
        }

        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (error) setError("");

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
            setError(dic?.auth.validation.otp_required);
            return;
        }

        setError("");

        try {
            const email = localStorage.getItem("user_email");
            if (!email) {
                setError("Session expired. Please start over.");
                return;
            }

            await verifyResetOTP(email, fullCode);

            localStorage.setItem("otp", fullCode);
            toast.success(dic?.auth.verify.success_message);
            router.push(`/${lang}/forgot-password/reset-password`);
        } catch (err: any) {
            setError(err.message || "Invalid verification code");
        }
    };

    const handleResend = async () => {
        try {
            setError("");
            setCode(["", "", "", "", "", ""]);
            await resendVerificationCode();

            // Set new expiry time (2 minutes from now)
            const expiryTime = Date.now() + 120000; // 120 seconds in milliseconds
            localStorage.setItem(
                "otp_expiry_time_reset",
                expiryTime.toString()
            );
            setCanEnterCode(true);

            // Focus first input after a short delay
            setTimeout(() => {
                inputRefs.current[0]?.focus();
            }, 100);
        } catch (err: any) {
            // Error already handled by useAuth
        }
    };

    useEffect(() => {
        getDic();
    }, [lang]);

    useEffect(() => {
        const calculateCountdown = () => {
            const expiryTime = localStorage.getItem("otp_expiry_time_reset");
            if (!expiryTime) {
                // Set initial expiry time if not exists (2 minutes from now)
                const newExpiryTime = Date.now() + 120000;
                localStorage.setItem(
                    "otp_expiry_time_reset",
                    newExpiryTime.toString()
                );
                return 120;
            }

            const remaining = Math.floor(
                (parseInt(expiryTime) - Date.now()) / 1000
            );
            return Math.max(0, remaining);
        };

        // Initial calculation
        const initialCountdown = calculateCountdown();
        setCountdown(initialCountdown);

        if (initialCountdown <= 0) {
            setCanEnterCode(false);
            setCode(["", "", "", "", "", ""]);
            return;
        }

        // Update countdown every second
        const timer = setInterval(() => {
            const remaining = calculateCountdown();
            setCountdown(remaining);

            if (remaining <= 0) {
                setCanEnterCode(false);
                setCode(["", "", "", "", "", ""]);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const email = localStorage.getItem("user_email");

        if (email) {
            try {
                setUserEmail(email);
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
                        <Link
                            href={`/${lang}/forgot-password/account-recovery`}
                            className="cursor-pointer rounded-xl flex justify-center items-center border border-[#0000001A] p-2 hover:bg-gray-50 transition-colors"
                        >
                            {lang === "ar" ? <FaAngleRight /> : <FaAngleLeft />}
                        </Link>
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

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleVerify();
                    }}
                    className="flex flex-col mt-5"
                >
                    {canEnterCode ? (
                        <>
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
                                        onKeyDown={(e) =>
                                            handleKeyDown(index, e)
                                        }
                                        onPaste={handlePaste}
                                        className={`w-10 lg:w-12 h-13 text-center text-2xl font-semibold font-poppins-semi-bold border-[0.5px] ${
                                            error
                                                ? "border-red-500"
                                                : "border-black/15"
                                        } rounded-[18px] lg:rounded-[20px] outline-none focus:border-tiny-pink focus:ring-2 focus:ring-tiny-pink/20 transition-all`}
                                    />
                                ))}
                            </div>

                            {/* Verify Button */}
                            <button
                                type="submit"
                                disabled={
                                    isLoading || code.some((digit) => !digit)
                                }
                                className="py-4 w-full bg-tiny-pink text-center text-white text-sm font-semibold font-poppins-semi-bold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-90 transition-all"
                            >
                                {isLoading
                                    ? dic?.auth.verify.verifying
                                    : dic?.auth.verify.send_code}
                            </button>

                            {/* Timer Display */}
                            <div className="flex items-center gap-1 justify-center mt-4">
                                <span className="font-poppins-regular text-sm lg:text-[16px] text-tiny-black-200">
                                    {dic?.auth.verify.code_expires}
                                </span>
                                <span className="font-poppins-medium font-medium text-sm text-[#093800]">
                                    ({Math.floor(countdown / 60)}:
                                    {String(countdown % 60).padStart(2, "0")})
                                </span>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Expired Message */}
                            <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                                <p className="text-sm text-orange-600 font-poppins-medium text-center">
                                    {dic?.auth.verify.code_expired}
                                </p>
                            </div>

                            {/* Resend Code Button */}
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={isLoading}
                                className="py-4 w-full bg-tiny-pink text-center text-white text-sm font-semibold font-poppins-semi-bold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-90 transition-all"
                            >
                                {isLoading
                                    ? dic?.auth.verify.resending
                                    : dic?.auth.verify.resend_code}
                            </button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}
