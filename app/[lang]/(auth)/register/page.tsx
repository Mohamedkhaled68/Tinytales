"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Flag from "react-world-flags";

import countriesData from "@/public/data/countries.json";
import { getDictionary } from "../../dictionaries";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

export default function RegisterPage() {
    const { lang } = useParams<{ lang: "en" | "ar" }>();

    const { registerUser, isLoading } = useAuth();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        mobile: "",
        mobile_country_code: "+971",
    });

    const [selectedCountry, setSelectedCountry] = useState({
        code: "AE",
        name: "United Arab Emirates",
        dialCode: "+971",
        flag: "🇦🇪",
    });

    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        mobile?: string;
        password?: string;
        password_confirmation?: string;
    }>({});

    const [dic, setDic] = useState<any>(null);

    const getDic = async () => {
        const dictionary = await getDictionary(lang);
        setDic(dictionary);
    };

    useEffect(() => {
        getDic();
    }, [lang]);

    const validateName = (name: string) => {
        if (!name.trim()) {
            return dic?.auth.validation.name_required;
        }
        if (name.trim().length < 2) {
            return dic?.auth.validation.name_min_length;
        }
        return "";
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

    const validateMobile = (mobile: string) => {
        if (!mobile.trim()) {
            return dic?.auth.validation.mobile_required;
        }
        if (!/^\d{7,15}$/.test(mobile)) {
            return dic?.auth.validation.mobile_invalid;
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
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return dic?.auth.validation.password_strong;
        }
        return "";
    };

    const validatePasswordConfirmation = (
        password: string,
        confirmation: string
    ) => {
        if (!confirmation) {
            return dic?.auth.validation.password_confirmation_required;
        }
        if (password !== confirmation) {
            return dic?.auth.validation.passwords_not_match;
        }
        return "";
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const handleBlur = (field: string) => {
        let error = "";

        switch (field) {
            case "name":
                error = validateName(form.name);
                break;
            case "email":
                error = validateEmail(form.email);
                break;
            case "mobile":
                error = validateMobile(form.mobile);
                break;
            case "password":
                error = validatePassword(form.password);
                break;
            case "password_confirmation":
                error = validatePasswordConfirmation(
                    form.password,
                    form.password_confirmation
                );
                break;
        }

        setErrors({ ...errors, [field]: error });
    };

    const handleCountrySelect = (country: any) => {
        setSelectedCountry(country);
        setForm({ ...form, mobile_country_code: country.dialCode });
        setShowCountryDropdown(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const nameError = validateName(form.name);
        const emailError = validateEmail(form.email);
        const mobileError = validateMobile(form.mobile);
        const passwordError = validatePassword(form.password);
        const passwordConfirmationError = validatePasswordConfirmation(
            form.password,
            form.password_confirmation
        );

        if (
            nameError ||
            emailError ||
            mobileError ||
            passwordError ||
            passwordConfirmationError
        ) {
            setErrors({
                name: nameError,
                email: emailError,
                mobile: mobileError,
                password: passwordError,
                password_confirmation: passwordConfirmationError,
            });
            return;
        }

        setErrors({});

        try {
            await registerUser(form, lang);
            localStorage.setItem("user_email", form.email);
            toast.success(dic?.auth.register.success_message);
        } catch (err: any) {
            // Error already handled by useAuth}
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
                        {dic?.auth.register.header_message}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col mt-4">
                    <div className="flex flex-col gap-8">
                        <div className="relative">
                            <label
                                htmlFor="name"
                                className={`absolute -top-2 ${
                                    lang === "ar" ? "right-3" : "left-3"
                                } font-normal font-poppins-regular text-xs text-tiny-black bg-white px-2`}
                            >
                                {dic?.auth.register.full_name}
                            </label>
                            <input
                                type="text"
                                className={`rounded-[10px] border-[0.5px] ${
                                    errors.name
                                        ? "border-red-500"
                                        : "border-black/15"
                                } font-medium font-poppins-medium text-xs text-tiny-black px-5 py-3.5 w-full outline-none`}
                                name="name"
                                id="name"
                                value={form.name}
                                onChange={handleChange}
                                onBlur={() => handleBlur("name")}
                                placeholder={
                                    dic?.auth.register.full_name_placeholder
                                }
                            />
                            {errors.name && (
                                <p className="text-xs text-red-600 font-poppins-regular mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                        <div className="relative">
                            <label
                                htmlFor="email"
                                className={`absolute -top-2 ${
                                    lang === "ar" ? "right-3" : "left-3"
                                } font-normal font-poppins-regular text-xs text-tiny-black bg-white px-2`}
                            >
                                {dic?.auth.register.email}
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
                                value={form.email}
                                onChange={handleChange}
                                onBlur={() => handleBlur("email")}
                                placeholder={
                                    dic?.auth.register.email_placeholder
                                }
                            />
                            {errors.email && (
                                <p className="text-xs text-red-600 font-poppins-regular mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Phone Number with Country Selector */}
                        <div className="relative">
                            <label
                                htmlFor="mobile"
                                className={`absolute -top-2 ${
                                    lang === "ar" ? "right-3" : "left-3"
                                } font-normal font-poppins-regular text-xs text-tiny-black bg-white px-2 z-10`}
                            >
                                {dic?.auth.register.phone_number}
                            </label>
                            <div
                                className={`flex items-center rounded-[10px] border-[0.5px] ${
                                    errors.mobile
                                        ? "border-red-500"
                                        : "border-black/15"
                                }`}
                            >
                                {/* Country Selector Dropdown */}
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowCountryDropdown(
                                                !showCountryDropdown
                                            )
                                        }
                                        className="flex items-center gap-1 px-3 py-3.5 cursor-pointer"
                                    >
                                        <div className="w-6">
                                            <Flag
                                                code={selectedCountry.code}
                                                className="w-full h-full object-cover rounded-[1px]"
                                            />
                                        </div>
                                        <span className="text-xs font-medium font-poppins-medium text-tiny-black">
                                            {selectedCountry.dialCode}
                                        </span>
                                        <svg
                                            className={`w-4 h-4 transition-transform ${
                                                showCountryDropdown
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>

                                    {/* Dropdown Menu */}
                                    {showCountryDropdown && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() =>
                                                    setShowCountryDropdown(
                                                        false
                                                    )
                                                }
                                            />
                                            <div className={`absolute top-full ${lang === "ar" ? "right-0" : "left-0"} mt-1 w-72 max-h-60 overflow-y-auto bg-white border border-black/15 rounded-lg shadow-lg z-20`}>
                                                {countriesData.map(
                                                    (country: any) => (
                                                        <button
                                                            key={country.code}
                                                            type="button"
                                                            onClick={() =>
                                                                handleCountrySelect(
                                                                    country
                                                                )
                                                            }
                                                            className="cursor-pointer w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                                                        >
                                                            <div className="w-6">
                                                                <Flag
                                                                    code={
                                                                        country.code
                                                                    }
                                                                    className="w-full h-full object-cover rounded-[1px]"
                                                                />
                                                            </div>
                                                            <span className="flex-1 text-xs font-normal font-poppins-regular text-tiny-black">
                                                                {country.name}
                                                            </span>
                                                            <span className="text-xs font-medium font-poppins-medium text-tiny-black">
                                                                {
                                                                    country.dialCode
                                                                }
                                                            </span>
                                                        </button>
                                                    )
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>

                                <span className="w-px h-5 bg-[#0202021A] rounded-[3px]" />

                                {/* Phone Input */}
                                <input
                                    type="tel"
                                    className={`font-medium font-poppins-medium text-xs text-tiny-black px-5 py-3.5 w-full outline-none ${
                                        lang === "ar" ? "text-right" : ""
                                    }`}
                                    name="mobile"
                                    id="mobile"
                                    value={form.mobile}
                                    onChange={handleChange}
                                    onBlur={() => handleBlur("mobile")}
                                    placeholder={
                                        dic?.auth.register
                                            .phone_number_placeholder
                                    }
                                />
                            </div>
                            {errors.mobile && (
                                <p className="text-xs text-red-600 font-poppins-regular mt-1">
                                    {errors.mobile}
                                </p>
                            )}
                        </div>

                        <div className="relative">
                            <label
                                htmlFor="password"
                                className={`absolute -top-2 ${
                                    lang === "ar" ? "right-3" : "left-3"
                                } font-normal font-poppins-regular text-xs text-tiny-black bg-white px-2`}
                            >
                                {dic?.auth.register.password}
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
                                value={form.password}
                                onChange={handleChange}
                                onBlur={() => handleBlur("password")}
                                placeholder={
                                    dic?.auth.register.password_placeholder
                                }
                            />
                            {errors.password && (
                                <p className="text-xs text-red-600 font-poppins-regular mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                        <div className="relative">
                            <label
                                htmlFor="password_confirmation"
                                className={`absolute -top-2 ${
                                    lang === "ar" ? "right-3" : "left-3"
                                } font-normal font-poppins-regular text-xs text-tiny-black bg-white px-2`}
                            >
                                {dic?.auth.register.password_confirmation}
                            </label>
                            <input
                                type="password"
                                className={`rounded-[10px] border-[0.5px] ${
                                    errors.password_confirmation
                                        ? "border-red-500"
                                        : "border-black/15"
                                } font-medium font-poppins-medium text-xs text-tiny-black px-5 py-3.5 w-full outline-none`}
                                name="password_confirmation"
                                id="password_confirmation"
                                value={form.password_confirmation}
                                onChange={handleChange}
                                onBlur={() =>
                                    handleBlur("password_confirmation")
                                }
                                placeholder={
                                    dic?.auth.register
                                        .password_confirmation_placeholder
                                }
                            />
                            {errors.password_confirmation && (
                                <p className="text-xs text-red-600 font-poppins-regular mt-1">
                                    {errors.password_confirmation}
                                </p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="cursor-pointer mt-8 py-4 w-full bg-tiny-pink text-center text-white text-sm font-semibold font-poppins-semi-bold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading
                            ? dic?.auth.register.registering
                            : dic?.auth.register.register}
                    </button>
                </form>

                <div className="flex items-center my-2">
                    <div className="h-0.5 w-full bg-[#ECECEC] rounded-2xl" />
                    <span className="p-2 text-sm font-medium font-poppins-medium">
                        {dic?.auth.register.or}
                    </span>
                    <div className="h-0.5 w-full bg-[#ECECEC] rounded-2xl" />
                </div>
                <Link
                    href={`/${lang}/login`}
                    className="cursor-pointer py-4 w-full border-[0.5px] border-tiny-pink rounded-2xl flex justify-center flex-wrap"
                >
                    <span className="text-sm text-tiny-black font-poppins-regular font-normal">
                        {dic?.auth.register.have_acc}
                    </span>
                    <span className="text-sm text-tiny-pink font-semibold font-poppins-semi-bold">
                        {dic?.auth.register.login_now}
                    </span>
                </Link>
            </div>
        </div>
    );
}
