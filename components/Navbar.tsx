"use client";
import Image from "next/image";
import {
    IoMenu,
    IoClose,
    IoCartOutline,
    IoHeartOutline,
} from "react-icons/io5";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getTokenFromCookie } from "@/utils/helpers";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [token, setToken] = useState("");
    const { lang } = useLanguage();
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(false);
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<{
        code: "en" | "ar";
        name: string;
    }>({
        code: (lang as "en" | "ar") || "en",
        name: lang === "ar" ? "Arabic" : "English",
    });

    const languages: Array<{ code: "en" | "ar"; name: string }> = [
        { code: "en", name: "English" },
        { code: "ar", name: "Arabic" },
    ];

    useEffect(() => {
        setSelectedLanguage({
            code: (lang as "en" | "ar") || "en",
            name: lang === "ar" ? "Arabic" : "English",
        });
    }, [lang]);

    const handleLanguageSelect = (language: {
        code: "en" | "ar";
        name: string;
    }) => {
        if (language.code === selectedLanguage.code) {
            setShowLanguageDropdown(false);
            return;
        }

        setSelectedLanguage(language);
        setShowLanguageDropdown(false);
        setIsLoading(true);

        const newPath = pathname.replace(`/${lang}`, `/${language.code}`);
        router.push(newPath);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const menuLinks = [
        { href: "/", label: "Home", icon: "/icons/home.svg" },
        { href: "/", label: "Our Categories", icon: "/icons/categories.svg" },
        { href: "/", label: "About Us", icon: "/icons/about.svg" },
        { href: "/", label: "Contact Us", icon: "/icons/contact.svg" },
        { href: "/", label: "FAQs", icon: "/icons/faq.webp" },
    ];

    useEffect(() => {
        const token = getTokenFromCookie();
        if (token) {
            setToken(token);
        }
    }, []);

    // Language Selector Component
    const LanguageSelector = () => (
        <div className="relative">
            <button
                type="button"
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                disabled={isLoading}
                className="cursor-pointer flex items-center gap-1 px-3 py-2 rounded-full hover:bg-gray-100 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span className="text-sm font-medium text-tiny-black">
                    {selectedLanguage.code.toUpperCase()}
                </span>
                <svg
                    className={`w-4 h-4 text-tiny-black transition-transform ${
                        showLanguageDropdown ? "rotate-180" : ""
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

            {/* Language Dropdown */}
            {showLanguageDropdown && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowLanguageDropdown(false)}
                    />
                    <div className="absolute top-full right-0 mt-2 w-32 bg-white border border-black/15 rounded-lg shadow-lg z-20 overflow-hidden">
                        {languages.map((language) => (
                            <button
                                key={language.code}
                                type="button"
                                onClick={() => handleLanguageSelect(language)}
                                disabled={isLoading}
                                className={`w-full text-left px-4 py-2.5 text-sm font-medium font-poppins-medium transition-colors disabled:cursor-not-allowed ${
                                    selectedLanguage.code === language.code
                                        ? "bg-tiny-pink text-white"
                                        : "text-tiny-black hover:bg-gray-50"
                                }`}
                            >
                                {language.name}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );

    return (
        <nav className="w-full p-5 shadow-[0px_0px_52px_-24px_#00000040] relative bg-white">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Image
                    src="/images/logo.svg"
                    alt="Tinytales Logo"
                    width={45}
                    height={35}
                    loading="eager"
                />

                {/* Desktop Navigation Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {menuLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-tiny-black-200 hover:text-blue-600 transition duration-200 text-sm font-normal font-poppins-regular"
                        >
                            <Image
                                src={link.icon}
                                alt={`${link.label} icon`}
                                width={16}
                                height={16}
                                className="inline-block mr-2"
                            />
                            {link.label}
                        </Link>
                    ))}
                </div>

                {token ? (
                    <>
                        {/* Desktop Icons "logged in user" */}
                        <div className="hidden lg:flex items-center">
                            <button className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition duration-200">
                                <BsHandbag
                                    size={22}
                                    className="text-tiny-black"
                                />
                            </button>
                            <button className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition duration-200">
                                <svg
                                    className="w-5 h-5 text-tiny-black"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                            </button>
                            <button className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition duration-200">
                                <IoHeartOutline
                                    size={22}
                                    className="text-tiny-black"
                                />
                            </button>
                            <button className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition duration-200">
                                <IoCartOutline
                                    size={22}
                                    className="text-tiny-black"
                                />
                            </button>
                            <LanguageSelector />
                            <Link
                                href={`/${lang}/profile`}
                                className="cursor-pointer flex items-center gap-1 px-3 py-2 rounded-full hover:bg-gray-100 transition duration-200"
                            >
                                <MdOutlineAccountCircle
                                    size={24}
                                    className="text-tiny-black"
                                />
                                <svg
                                    className="w-4 h-4 text-tiny-black"
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
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Desktop Icons "guest" */}
                        <div className="hidden lg:flex items-center gap-2">
                            <LanguageSelector />
                            <Link
                                href={`/${lang}/login`}
                                className="cursor-pointer flex items-center gap-1 rounded-xl border-[0.5px] border-[#0000001A] bg-tiny-pink px-9.5 py-3.5"
                            >
                                <span className="text-sm font-poppins-medium font-medium text-white">
                                    Login
                                </span>
                                <div className="relative w-6 h-6">
                                    <Image
                                        src={"/icons/login.svg"}
                                        fill
                                        priority
                                        alt="login-icon"
                                    />
                                </div>
                            </Link>
                        </div>
                    </>
                )}

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="lg:hidden flex items-center justify-center h-11 w-11 rounded-full hover:bg-[#f4f4f4bb] transition ease-in-out duration-300"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute right-5 top-20 bg-white shadow-lg rounded-lg py-2 min-w-50 z-50">
                    {menuLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="block px-6 py-3 text-tiny-black hover:bg-gray-100 transition duration-200"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    
                    {/* Mobile Language Selector */}
                    <div className="border-t border-gray-200 mt-2 pt-2">
                        <div className="px-6 py-2 text-xs text-gray-500">Language</div>
                        {languages.map((language) => (
                            <button
                                key={language.code}
                                onClick={() => {
                                    handleLanguageSelect(language);
                                    setIsMenuOpen(false);
                                }}
                                className={`w-full text-left px-6 py-3 text-tiny-black hover:bg-gray-100 transition duration-200 ${
                                    selectedLanguage.code === language.code
                                        ? "bg-tiny-pink/10 font-semibold"
                                        : ""
                                }`}
                            >
                                {language.name}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Login Button */}
                    {!token && (
                        <div className="border-t border-gray-200 mt-2 pt-2 px-6 py-2">
                            <Link
                                href={`/${lang}/login`}
                                className="flex items-center justify-center gap-2 w-full rounded-xl bg-tiny-pink px-4 py-3"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="text-sm font-poppins-medium font-medium text-white">
                                    Login
                                </span>
                                <div className="relative w-5 h-5">
                                    <Image
                                        src={"/icons/login.svg"}
                                        fill
                                        alt="login-icon"
                                    />
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;