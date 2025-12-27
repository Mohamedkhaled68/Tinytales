"use client";

import { getDictionary } from "@/app/[lang]/dictionaries";
import { apiRequest } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import toast from "react-hot-toast";

interface CreateNewPasswordProps {
    setStep: React.Dispatch<React.SetStateAction<string>>;
}

const CreateNewPassword = ({ setStep }: CreateNewPasswordProps) => {
    const { lang } = useParams<{ lang: "en" | "ar" }>();
    const router = useRouter();
    const [dic, setDic] = useState<any>(null);
    const [form, setForm] = useState({
        password: "",
        password_confirmation: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getDic = async () => {
        const dictionary = await getDictionary(lang);
        setDic(dictionary);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error) setError("");
    };

    const handleSubmit = async () => {
        if (!form.password || !form.password_confirmation) {
            setError("Please fill in all fields");
            return;
        }

        if (form.password !== form.password_confirmation) {
            setError("Passwords do not match");
            return;
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(form.password)) {
            setError(
                "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long."
            );
            return;
        }

        setLoading(true);
        setError("");

        try {
            const otp = localStorage.getItem("otp");
            const email = localStorage.getItem("email_recovery");
            const res = await apiRequest("/forget-password/reset-password", {
                method: "POST",
                body: JSON.stringify({
                    email,
                    otp,
                    password: form.password,
                    password_confirmation: form.password_confirmation,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            toast.success("Password reset successfully");

            localStorage.removeItem("otp");
            localStorage.removeItem("email_recovery");

            router.push(`/${lang}/login`);
        } catch (err: any) {
            toast.error(err.message || "Failed to reset password");
        } finally {
            setLoading(false);
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
                        <button
                            onClick={() => setStep("email")}
                            className="cursor-pointer rounded-xl flex justify-center items-center border border-[#0000001A] p-2 hover:bg-gray-50 transition-colors"
                        >
                            {lang === "ar" ? <FaAngleRight /> : <FaAngleLeft />}
                        </button>
                    </div>
                    <h1 className="text-[16px] lg:text-2xl font-medium font-poppins-medium text-tiny-black">
                        {dic?.auth.create_new_password.heading}
                    </h1>
                    <div className="flex flex-col items-center gap-1">
                        <p className="text-tiny-black-200 text-xs lg:text-[16px] font-normal font-poppins-regular text-center">
                            {dic?.auth.create_new_password.description}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col mt-4 gap-8">
                    <div className="relative">
                        <label
                            htmlFor="password"
                            className={`absolute -top-2 ${
                                lang === "ar" ? "right-3" : "left-3"
                            } font-normal font-poppins-regular text-xs text-tiny-black bg-white px-2`}
                        >
                            {dic?.auth.create_new_password.password}
                        </label>
                        <input
                            type="password"
                            className="rounded-[10px] border-[0.5px] border-black/15 font-medium font-poppins-medium text-xs text-tiny-black px-5 py-3.5 w-full outline-none"
                            name="password"
                            id="password"
                            value={form.password}
                            onChange={handleChange}
                            disabled={loading}
                            placeholder={
                                dic?.auth.create_new_password
                                    .password_placeholder
                            }
                        />
                    </div>
                    <div className="relative">
                        <label
                            htmlFor="password_confirmation"
                            className={`absolute -top-2 ${
                                lang === "ar" ? "right-3" : "left-3"
                            } font-normal font-poppins-regular text-xs text-tiny-black bg-white px-2`}
                        >
                            {
                                dic?.auth.create_new_password
                                    .password_confirmation
                            }
                        </label>
                        <input
                            type="password"
                            className="rounded-[10px] border-[0.5px] border-black/15 font-medium font-poppins-medium text-xs text-tiny-black px-5 py-3.5 w-full outline-none"
                            name="password_confirmation"
                            id="password_confirmation"
                            value={form.password_confirmation}
                            onChange={handleChange}
                            disabled={loading}
                            placeholder={
                                dic?.auth.create_new_password
                                    .password_confirmation_placeholder
                            }
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-xs text-red-600 font-poppins-regular">
                                {error}
                            </p>
                        </div>
                    )}

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="mt-3 py-4 w-full bg-tiny-pink text-center text-white text-sm font-semibold font-poppins-semi-bold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-90 transition-all"
                    >
                        {loading
                            ? "Resetting..."
                            : dic?.auth.create_new_password.login}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateNewPassword;
