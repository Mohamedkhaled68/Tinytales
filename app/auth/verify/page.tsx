"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import { getTokenFromCookie } from "@/utils/helpers";

export default function VerifyPage() {
    const router = useRouter();
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

        if (fullCode !== "123456") {
            setError("Invalid verification code");
            setLoading(false);
            return;
        }

        const token = getTokenFromCookie();

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

            router.push("/auth/login");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                            <svg
                                className="w-8 h-8 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Verify Your Email
                        </h2>
                        <p className="text-gray-600">
                            We've sent a 6-digit code to your email address.
                            <br />
                            Please enter it below.
                        </p>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                            Verification Code
                        </label>
                        <div className="flex gap-2 justify-center">
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
                                    className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                />
                            ))}
                        </div>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleVerify}
                        disabled={loading || code.join("").length !== 6}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg
                                    className="animate-spin h-5 w-5 mr-2"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Verifying...
                            </span>
                        ) : (
                            "Verify Email"
                        )}
                    </button>

                    <div className="text-center space-y-3">
                        <p className="text-sm text-gray-600">
                            Didn't receive the code?
                        </p>
                        <button
                            onClick={handleResend}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Resend Code
                        </button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-600">
                            Wrong email?{" "}
                            <a
                                href="/auth/register"
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Go back
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
