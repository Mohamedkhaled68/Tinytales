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
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { getToken } from "@/lib/token";
import { getDictionary } from "@/app/[lang]/dictionaries";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [token, setToken] = useState("");
    const { lang } = useLanguage();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [showLanguagePage, setShowLanguagePage] = useState(false);
    const [showProfilePage, setShowProfilePage] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [dic, setDic] = useState<any>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<{
        code: "en" | "ar";
        name: string;
    }>({
        code: (lang as "en" | "ar") || "en",
        name: lang === "ar" ? "Arabic" : "English",
    });

    const { logoutUser } = useAuth();

    const getDic = async () => {
        const dictionary = await getDictionary(lang as "en" | "ar");
        setDic(dictionary);
    };

    const languages: Array<{ code: "en" | "ar"; name: string }> = [
        { code: "en", name: "English" },
        { code: "ar", name: "العربية" },
    ];

    useEffect(() => {
        getDic();

        // Check localStorage for saved language preference
        const savedLang = localStorage.getItem("preferredLanguage") as
            | "en"
            | "ar"
            | null;

        // If there's a saved language and it's different from current URL lang, redirect
        if (savedLang && savedLang !== lang) {
            const newPath = pathname.replace(`/${lang}`, `/${savedLang}`);
            router.replace(newPath);
            return;
        }

        // Save current language to localStorage
        if (lang) {
            localStorage.setItem("preferredLanguage", lang);
        }

        setSelectedLanguage({
            code: (lang as "en" | "ar") || "en",
            name: lang === "ar" ? "العربية" : "English",
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

        // Save to localStorage
        localStorage.setItem("preferredLanguage", language.code);

        const newPath = pathname.replace(`/${lang}`, `/${language.code}`);
        const queryString = searchParams.toString();
        const fullPath = queryString ? `${newPath}?${queryString}` : newPath;
        router.replace(fullPath);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = async () => {
        localStorage.removeItem("user");
        await logoutUser(lang);
        setToken(""); // Clear the token state
        setShowLogoutConfirm(false);
        setIsMenuOpen(false);
        router.push(`/${lang}`);
    };

    const menuLinks = [
        {
            href: `/${lang}`,
            label: dic?.navbar.home || "Home",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
                        stroke="#8A8A8A"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M15 18H9"
                        stroke="#8A8A8A"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>
            ),
            activeIcon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.5192 7.82274C2 8.77128 2 9.91549 2 12.2039V13.725C2 17.6258 2 19.5763 3.17157 20.7881C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.7881C22 19.5763 22 17.6258 22 13.725V12.2039C22 9.91549 22 8.77128 21.4808 7.82274C20.9616 6.87421 20.0131 6.28551 18.116 5.10812L16.116 3.86687C14.1106 2.62229 13.1079 2 12 2C10.8921 2 9.88939 2.62229 7.88403 3.86687L5.88403 5.10813C3.98695 6.28551 3.0384 6.87421 2.5192 7.82274ZM9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z"
                        fill="#BE968E"
                    />
                </svg>
            ),
        },
        {
            href: `/${lang}/categories`,
            label: dic?.navbar.categories || "Our Categories",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                >
                    <path
                        d="M0.75 2.41667C0.75 1.49619 1.49619 0.75 2.41667 0.75H5.75C6.67047 0.75 7.41667 1.49619 7.41667 2.41667V5.75C7.41667 6.67047 6.67047 7.41667 5.75 7.41667H2.41667C1.49619 7.41667 0.75 6.67047 0.75 5.75V2.41667Z"
                        stroke="#8A8A8A"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M17.4167 4.08333C17.4167 5.92428 15.9243 7.41667 14.0833 7.41667C12.2424 7.41667 10.75 5.92428 10.75 4.08333C10.75 2.24238 12.2424 0.75 14.0833 0.75C15.9243 0.75 17.4167 2.24238 17.4167 4.08333Z"
                        stroke="#8A8A8A"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M7.41667 14.0833C7.41667 15.9243 5.92428 17.4167 4.08333 17.4167C2.24238 17.4167 0.75 15.9243 0.75 14.0833C0.75 12.2424 2.24238 10.75 4.08333 10.75C5.92428 10.75 7.41667 12.2424 7.41667 14.0833Z"
                        stroke="#8A8A8A"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M10.75 12.4167C10.75 11.4962 11.4962 10.75 12.4167 10.75H15.75C16.6705 10.75 17.4167 11.4962 17.4167 12.4167V15.75C17.4167 16.6705 16.6705 17.4167 15.75 17.4167H12.4167C11.4962 17.4167 10.75 16.6705 10.75 15.75V12.4167Z"
                        stroke="#8A8A8A"
                        strokeWidth="1.5"
                    />
                </svg>
            ),
            activeIcon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                >
                    <path
                        d="M3.16699 9.5C4.91589 9.5 6.33398 10.9181 6.33398 12.667C6.33398 14.4159 4.91589 15.834 3.16699 15.834C1.41809 15.834 1.2884e-07 14.4159 0 12.667C0 10.9181 1.41809 9.5 3.16699 9.5ZM14.25 9.5C15.1245 9.5 15.834 10.2095 15.834 11.084V14.25C15.834 15.1245 15.1245 15.834 14.25 15.834H11.084C10.2095 15.834 9.5 15.1245 9.5 14.25V11.084C9.5 10.2095 10.2095 9.5 11.084 9.5H14.25ZM4.75 0C5.62445 0 6.33398 0.709534 6.33398 1.58398V4.75C6.33398 5.62445 5.62445 6.33398 4.75 6.33398H1.58398C0.709534 6.33398 0 5.62445 0 4.75V1.58398C0 0.709534 0.709534 0 1.58398 0H4.75ZM12.667 0C14.4159 1.28838e-07 15.834 1.41809 15.834 3.16699C15.834 4.91589 14.4159 6.33398 12.667 6.33398C10.9181 6.33398 9.5 4.91589 9.5 3.16699C9.5 1.41809 10.9181 0 12.667 0Z"
                        fill="#BE968E"
                    />
                </svg>
            ),
        },
        {
            href: `/${lang}/about`,
            label: dic?.navbar.about || "About Us",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                >
                    <path
                        d="M12.9482 7.52359C12.3308 5.99513 10.833 4.91667 9.08333 4.91667C6.78215 4.91667 4.91667 6.78215 4.91667 9.08333C4.91667 10.833 5.99513 12.3308 7.52359 12.9482M9.01296 17.4164C4.44299 17.3786 0.75 13.6622 0.75 9.08333C0.75 4.48096 4.48096 0.75 9.08333 0.75C13.6622 0.75 17.3786 4.44299 17.4164 9.01296M9.13108 10.2696L11.3083 16.8012C11.5818 17.6218 12.7425 17.6218 13.0161 16.8012L13.82 14.3893C13.9096 14.1205 14.1205 13.9096 14.3893 13.82L16.8012 13.0161C17.6218 12.7425 17.6218 11.5818 16.8012 11.3083L10.2696 9.13108C9.56596 8.89653 8.89653 9.56596 9.13108 10.2696Z"
                        stroke="#8A8A8A"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
            activeIcon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                >
                    <path
                        d="M8.95801 0C13.8803 0 17.8754 3.96997 17.916 8.88281C17.9187 9.22782 17.641 9.50984 17.2959 9.5127C16.9509 9.51537 16.6689 9.23764 16.666 8.89258C16.6309 4.66557 13.1934 1.25 8.95801 1.25C4.70081 1.25 1.25 4.70081 1.25 8.95801C1.25 13.1934 4.66557 16.6309 8.89258 16.666C9.23764 16.6689 9.51537 16.9509 9.5127 17.2959C9.50984 17.641 9.22782 17.9187 8.88281 17.916C3.96997 17.8754 0 13.8803 0 8.95801C2.33551e-07 4.01046 4.01046 2.33559e-07 8.95801 0ZM9.00586 10.1445C8.77131 9.44088 9.44088 8.77131 10.1445 9.00586L16.6758 11.1826C17.4964 11.4562 17.4964 12.6171 16.6758 12.8906L14.2637 13.6943C13.995 13.7839 13.7839 13.995 13.6943 14.2637L12.8906 16.6758C12.6171 17.4964 11.4562 17.4964 11.1826 16.6758L9.00586 10.1445ZM8.95801 4.16602C10.9711 4.16602 12.6927 5.40755 13.4023 7.16406C13.5316 7.48411 13.3767 7.84825 13.0566 7.97754C12.7367 8.10661 12.3725 7.95258 12.2432 7.63281C11.7179 6.33248 10.4443 5.41602 8.95801 5.41602C7.002 5.41602 5.41602 7.002 5.41602 8.95801C5.41602 10.4443 6.33248 11.7179 7.63281 12.2432C7.95258 12.3725 8.10661 12.7367 7.97754 13.0566C7.84825 13.3767 7.48411 13.5316 7.16406 13.4023C5.40755 12.6927 4.16602 10.9711 4.16602 8.95801C4.16602 6.31164 6.31164 4.16602 8.95801 4.16602Z"
                        fill="#BE968E"
                    />
                </svg>
            ),
        },
        {
            href: `/${lang}/contact`,
            label: dic?.navbar.contact || "Contact Us",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="17"
                    viewBox="0 0 19 17"
                    fill="none"
                >
                    <path
                        d="M14.0833 12.4167H11.5833M14.0833 9.91667H11.5833M4.08333 15.75H14.0833C15.9243 15.75 17.4167 14.2576 17.4167 12.4167V4.08333C17.4167 2.24238 15.9243 0.75 14.0833 0.75H4.08333C2.24238 0.75 0.75 2.24238 0.75 4.08333V12.4167C0.75 14.2576 2.24238 15.75 4.08333 15.75ZM5.75 4.08333H7.41667C8.33714 4.08333 9.08333 4.82953 9.08333 5.75C9.08333 6.67047 8.33714 7.41667 7.41667 7.41667H5.75C4.82952 7.41667 4.08333 6.67047 4.08333 5.75C4.08333 4.82953 4.82952 4.08333 5.75 4.08333Z"
                        stroke="#8A8A8A"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
            activeIcon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="17"
                    viewBox="0 0 17 15"
                    fill="none"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 3.33333C0 1.49238 1.49238 0 3.33333 0H13.3333C15.1743 0 16.6667 1.49238 16.6667 3.33333V11.6667C16.6667 13.5076 15.1743 15 13.3333 15H3.33333C1.49238 15 0 13.5076 0 11.6667V3.33333ZM10.2083 9.16667C10.2083 8.82149 10.4882 8.54167 10.8333 8.54167H13.3333C13.6785 8.54167 13.9583 8.82149 13.9583 9.16667C13.9583 9.51184 13.6785 9.79167 13.3333 9.79167H10.8333C10.4882 9.79167 10.2083 9.51184 10.2083 9.16667ZM10.2083 11.6667C10.2083 11.3215 10.4882 11.0417 10.8333 11.0417H13.3333C13.6785 11.0417 13.9583 11.3215 13.9583 11.6667C13.9583 12.0118 13.6785 12.2917 13.3333 12.2917H10.8333C10.4882 12.2917 10.2083 12.0118 10.2083 11.6667ZM5 3.33333H6.66667C7.58714 3.33333 8.33333 4.07953 8.33333 5C8.33333 5.92047 7.58714 6.66667 6.66667 6.66667H5C4.07953 6.66667 3.33333 5.92047 3.33333 5C3.33333 4.07953 4.07953 3.33333 5 3.33333Z"
                        fill="#BE968E"
                    />
                </svg>
            ),
        },
        {
            href: `/${lang}/FAQs`,
            label: dic?.navbar.faqs || "FAQs",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="17"
                    viewBox="0 0 19 17"
                    fill="none"
                >
                    <path
                        d="M9.08333 4.91667V5.75M9.08333 8.25V11.5833M8.25 0.75H9.91667C14.0588 0.75 17.4167 4.10786 17.4167 8.25C17.4167 12.3921 14.0588 15.75 9.91667 15.75H4.08333C2.24238 15.75 0.75 14.2576 0.75 12.4167V8.25C0.75 4.10786 4.10786 0.75 8.25 0.75Z"
                        stroke="#8A8A8A"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
            activeIcon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.70833 0H7.125C3.18997 0 0 3.18997 0 7.125V11.0833C0 12.8322 1.41776 14.25 3.16667 14.25H8.70833C12.6434 14.25 15.8333 11.06 15.8333 7.125C15.8333 3.18997 12.6434 0 8.70833 0ZM7.91667 3.36458C8.24459 3.36458 8.51042 3.63041 8.51042 3.95833V4.75C8.51042 5.07792 8.24459 5.34375 7.91667 5.34375C7.58875 5.34375 7.32292 5.07792 7.32292 4.75V3.95833C7.32292 3.63041 7.58875 3.36458 7.91667 3.36458ZM8.51042 7.125C8.51042 6.79708 8.24459 6.53125 7.91667 6.53125C7.58875 6.53125 7.32292 6.79708 7.32292 7.125V10.2917C7.32292 10.6196 7.58875 10.8854 7.91667 10.8854C8.24459 10.8854 8.51042 10.6196 8.51042 10.2917V7.125Z"
                        fill="#BE968E"
                    />
                </svg>
            ),
        },
    ];

    const menuProfileLinks = [
        {
            href: `/${lang}/profile/general-settings`,
            label: dic?.navbar.general_settings || "General Settings",
            icon: (
                <svg
                    className="w-5 h-5 text-tiny-black-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            ),
            activeIcon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.04545 0H9.95455C11.0089 0 11.8636 0.805887 11.8636 1.8C11.8636 2.93762 13.0808 3.66088 14.08 3.11698L14.1815 3.06174C15.0946 2.56468 16.2622 2.85966 16.7894 3.72058L17.7439 5.27943C18.2711 6.14036 17.9582 7.24122 17.0451 7.73828C16.0455 8.28243 16.0455 9.71757 17.0451 10.2617C17.9582 10.7588 18.2711 11.8596 17.7439 12.7206L16.7894 14.2794C16.2622 15.1403 15.0946 15.4353 14.1815 14.9383L14.08 14.883C13.0808 14.3391 11.8636 15.0624 11.8636 16.2C11.8636 17.1941 11.0089 18 9.95455 18H8.04545C6.99109 18 6.13635 17.1941 6.13635 16.2C6.13635 15.0624 4.91917 14.3391 3.92 14.883L3.81851 14.9383C2.90541 15.4353 1.73782 15.1404 1.21064 14.2794L0.256089 12.7206C-0.271093 11.8597 0.0417603 10.7588 0.954868 10.2617C1.95451 9.71758 1.95451 8.28242 0.954869 7.73826C0.0417618 7.24121 -0.271092 6.14034 0.256091 5.27942L1.21064 3.72057C1.73782 2.85964 2.90541 2.56467 3.81852 3.06172L3.92 3.11697C4.91917 3.66087 6.13635 2.93761 6.13635 1.8C6.13635 0.805888 6.99109 0 8.04545 0ZM9.00001 12C10.6569 12 12 10.6569 12 9C12 7.34315 10.6569 6 9.00001 6C7.34315 6 6.00001 7.34315 6.00001 9C6.00001 10.6569 7.34315 12 9.00001 12Z"
                        fill="#BE968E"
                    />
                </svg>
            ),
        },
        {
            href: `/${lang}/profile/address`,
            label: dic?.navbar.my_address || "My Address",
            icon: (
                <svg
                    className="w-5 h-5 text-tiny-black-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            ),
            activeIcon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <g id="style=fill">
                        <g id="location">
                            <path
                                id="Subtract"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M8.89129 21.0787L8.9461 21.1315L8.95039 21.1357C9.95462 22.098 10.9283 22.7576 12.0296 22.7449C13.1259 22.7323 14.0956 22.0555 15.0992 21.0783C16.4747 19.7455 18.2545 17.9477 19.5403 15.8149C20.831 13.6741 21.6639 11.1292 21.0372 8.33595C18.9197 -1.10413 5.09133 -1.11519 2.96276 8.32592C2.35382 11.04 3.12314 13.5227 4.34999 15.6268C5.57222 17.7231 7.2824 19.5029 8.65394 20.8471C8.73386 20.9254 8.81273 21.0023 8.89035 21.0778L8.89129 21.0787ZM12 6.25012C10.2051 6.25012 8.75 7.7052 8.75 9.50012C8.75 11.295 10.2051 12.7501 12 12.7501C13.7949 12.7501 15.25 11.295 15.25 9.50012C15.25 7.7052 13.7949 6.25012 12 6.25012Z"
                                fill="#BE968E"
                            />
                        </g>
                    </g>
                </svg>
            ),
        },
        {
            href: `/${lang}/profile/orders-history`,
            label: dic?.navbar.orders_history || "Orders History",
            icon: (
                <svg
                    className="w-5 h-5 text-tiny-black-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
            ),
            activeIcon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.61132 13C9.24662 13 8.91085 13.1985 8.7351 13.5181C8.36855 14.1845 8.85071 15 9.61131 15H18.92C19.4723 15 19.92 15.4477 19.92 16C19.92 16.5523 19.4723 17 18.92 17H17.93H7.92999H7.92004C6.40004 17 5.44004 15.37 6.17004 14.03L7.02318 12.488C7.33509 11.9243 7.35632 11.2448 7.08022 10.6627L4.25211 4.70011C4.04931 4.27254 3.6184 4 3.14518 4H2.92004C2.36776 4 1.92004 3.55228 1.92004 3C1.92004 2.44772 2.36776 2 2.92004 2H3.92398C4.69708 2 5.40095 2.44557 5.7317 3.14435L5.90228 3.50471C5.93443 3.5016 5.96703 3.5 6 3.5H21C21.5523 3.5 22 3.94772 22 4.5C22 4.77321 21.8904 5.02082 21.7129 5.20131C21.7448 5.41025 21.7106 5.63097 21.6008 5.83041L18.22 11.97C17.88 12.59 17.22 13 16.47 13H9.61132ZM7.92999 17C9.03456 17 9.92999 17.8954 9.92999 19C9.92999 20.1046 9.03456 21 7.92999 21C6.82542 21 5.92999 20.1046 5.92999 19C5.92999 17.8954 6.82542 17 7.92999 17ZM17.93 17C16.8254 17 15.93 17.8954 15.93 19C15.93 20.1046 16.8254 21 17.93 21C19.0346 21 19.93 20.1046 19.93 19C19.93 17.8954 19.0346 17 17.93 17Z"
                        fill="#BE968E"
                    />
                    <path
                        d="M7.92999 20C8.48228 20 8.92999 19.5523 8.92999 19C8.92999 18.4477 8.48228 18 7.92999 18C7.37771 18 6.92999 18.4477 6.92999 19C6.92999 19.5523 7.37771 20 7.92999 20Z"
                        fill="#BE968E"
                    />
                    <path
                        d="M18.93 19C18.93 19.5523 18.4823 20 17.93 20C17.3777 20 16.93 19.5523 16.93 19C16.93 18.4477 17.3777 18 17.93 18C18.4823 18 18.93 18.4477 18.93 19Z"
                        fill="#BE968E"
                    />
                </svg>
            ),
        },
    ];

    useEffect(() => {
        const token = getToken();
        if (token) {
            setToken(token);
        }
    }, [token, logoutUser]);

    const LanguageSelector = () => (
        <div className="relative">
            <button
                type="button"
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                disabled={isLoading}
                className={`cursor-pointer flex items-center ${
                    lang === "ar" ? "flex-row-reverse" : ""
                } gap-1 px-3 py-2 rounded-full hover:bg-gray-100 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
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
                    <div
                        className={`absolute top-full ${
                            lang === "ar" ? "left-0" : "right-0"
                        } mt-2 w-32 bg-white border border-black/15 rounded-lg shadow-lg z-20 overflow-hidden`}
                    >
                        {languages.map((language) => (
                            <button
                                key={language.code}
                                type="button"
                                onClick={() => handleLanguageSelect(language)}
                                disabled={isLoading}
                                className={`cursor-pointer w-full text-left px-4 py-2.5 text-sm font-medium font-poppins-medium transition-colors disabled:cursor-not-allowed ${
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
                <Link href={"/"} className="relative w-21 h-11 ">
                    <Image
                        src="/images/logo.svg"
                        alt="Tinytales Logo"
                        fill
                        loading="eager"
                    />
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {menuLinks.map((link, index) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={index}
                                href={link.href}
                                className={`transition duration-200 flex gap-1.5`}
                            >
                                {isActive ? link.activeIcon : link.icon}
                                <span
                                    className={`relative ${
                                        isActive
                                            ? "text-tiny-pink text-sm font-semibold font-poppins-semi-bold"
                                            : "text-tiny-black-200 text-sm font-normal font-poppins-regular"
                                    }`}
                                >
                                    {link.label}
                                    {isActive && (
                                        <span
                                            className={`absolute  ${
                                                lang === "ar"
                                                    ? "right-0 -bottom-2"
                                                    : "left-0 -bottom-1"
                                            } w-7 h-0.5 bg-tiny-pink rounded-lg`}
                                        />
                                    )}
                                </span>
                            </Link>
                        );
                    })}
                </div>

                {token ? (
                    <>
                        {/* Desktop Icons "logged in user" */}
                        <div className="hidden lg:flex items-center">
                            <button className="cursor-pointer flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition duration-200">
                                <BsHandbag
                                    size={22}
                                    className="text-tiny-black"
                                />
                            </button>
                            <button className="cursor-pointer flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition duration-200">
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
                            <button className="cursor-pointer flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition duration-200">
                                <IoHeartOutline
                                    size={22}
                                    className="text-tiny-black"
                                />
                            </button>
                            <button className="cursor-pointer flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition duration-200">
                                <IoCartOutline
                                    size={22}
                                    className="text-tiny-black"
                                />
                            </button>
                            <LanguageSelector />
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowProfileDropdown(
                                            !showProfileDropdown
                                        )
                                    }
                                    className={`cursor-pointer flex items-center ${
                                        lang === "ar" ? "flex-row-reverse" : ""
                                    } gap-1 px-3 py-2 rounded-full hover:bg-gray-100 transition duration-200`}
                                >
                                    <MdOutlineAccountCircle
                                        size={24}
                                        className="text-tiny-black"
                                    />
                                    <svg
                                        className={`w-4 h-4 text-tiny-black transition-transform ${
                                            showProfileDropdown
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

                                {/* Profile Dropdown */}
                                {showProfileDropdown && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() =>
                                                setShowProfileDropdown(false)
                                            }
                                        />
                                        <div
                                            className={`absolute top-full ${
                                                lang === "ar"
                                                    ? "-right-40"
                                                    : "-left-40"
                                            } mt-2 w-56 bg-white border border-black/15 rounded-lg shadow-lg z-20 overflow-hidden`}
                                        >
                                            {menuProfileLinks.map(
                                                (link, index) => {
                                                    const isActive =
                                                        pathname === link.href;
                                                    return (
                                                        <Link
                                                            key={index}
                                                            href={link.href}
                                                            onClick={() =>
                                                                setShowProfileDropdown(
                                                                    false
                                                                )
                                                            }
                                                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium font-poppins-medium transition-colors hover:bg-gray-50"
                                                        >
                                                            {isActive
                                                                ? link.activeIcon
                                                                : link.icon}
                                                            <span
                                                                className={`${
                                                                    isActive
                                                                        ? "text-tiny-pink"
                                                                        : "text-tiny-black-200"
                                                                }`}
                                                            >
                                                                {link.label}
                                                            </span>
                                                        </Link>
                                                    );
                                                }
                                            )}
                                            <div className="border-t border-gray-200">
                                                <button
                                                    onClick={() => {
                                                        setShowProfileDropdown(
                                                            false
                                                        );
                                                        setShowLogoutConfirm(
                                                            true
                                                        );
                                                    }}
                                                    className="cursor-pointer flex items-center gap-3 px-4 py-3 w-full text-sm font-medium font-poppins-medium text-[#D90202] hover:bg-red-50 transition-colors"
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                        />
                                                    </svg>
                                                    <span>
                                                        {dic?.navbar.logout ||
                                                            "Logout"}
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Desktop Logout Confirmation Popup */}
                            {showLogoutConfirm && (
                                <>
                                    <div
                                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
                                        onClick={() =>
                                            setShowLogoutConfirm(false)
                                        }
                                    >
                                        <div
                                            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="text-center mb-6">
                                                <div className="w-15 h-15 relative mx-auto">
                                                    <Image
                                                        src={
                                                            "/icons/logout.svg"
                                                        }
                                                        alt="logout-icon"
                                                        fill
                                                    />
                                                </div>
                                                <h3 className="text-[20px] font-poppins-semibold font-semibold text-tiny-black mb-2 mt-2">
                                                    {dic?.navbar
                                                        .logout_confirm ||
                                                        "Are you sure you want to Log Out?"}
                                                </h3>
                                            </div>
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex-1 px-4 py-2.5 bg-[#D90202] text-white font-poppins-medium rounded-lg transition duration-200"
                                                >
                                                    {dic?.navbar.logout ||
                                                        "Logout"}
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setShowLogoutConfirm(
                                                            false
                                                        )
                                                    }
                                                    className="flex-1 px-4 py-2.5 text-[#D90202] border border-[#D90202] font-poppins-medium rounded-lg transition duration-200"
                                                >
                                                    {dic?.navbar.cancel ||
                                                        "Cancel"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
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
                                    {dic?.navbar.login || "Login"}
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

            {/* Mobile Full-Page Menu */}
            {isMenuOpen && (
                <div className="lg:hidden max-h-screen fixed inset-0 top-0 bg-white z-50 overflow-y-auto">
                    {!showLanguagePage && !showProfilePage ? (
                        <>
                            {/* Mobile Menu Header */}
                            <div className="px-5 pt-5">
                                <div className="w-full flex justify-between items-center  border-b border-gray-200 pb-5">
                                    <h1 className="text-[24px] font-medium font-poppins-medium text-tiny-black">
                                        {dic?.navbar.menu || "Menu"}
                                    </h1>
                                    <button
                                        onClick={toggleMenu}
                                        className="flex items-center justify-center h-11 w-11 rounded-full hover:bg-gray-100 transition duration-200"
                                        aria-label="Close menu"
                                    >
                                        <IoClose size={24} />
                                    </button>
                                </div>
                            </div>

                            {/* Mobile Menu Content */}
                            <div className="p-2 flex flex-col min-h-[calc(100vh-120px)]">
                                {/* Menu Links */}
                                <div className="flex flex-col">
                                    {menuLinks.map((link, index) => {
                                        const isActive = pathname === link.href;
                                        return (
                                            <div key={index}>
                                                <Link
                                                    href={link.href}
                                                    className={`flex items-center gap-2 px-4 py-4 rounded-lg transition duration-200 relative`}
                                                    onClick={() =>
                                                        setIsMenuOpen(false)
                                                    }
                                                >
                                                    {isActive
                                                        ? link.activeIcon
                                                        : link.icon}
                                                    <span
                                                        className={`font-normal text-base ${
                                                            isActive
                                                                ? "font-poppins-semi-bold text-tiny-pink"
                                                                : "font-poppins-regular text-tiny-black-200"
                                                        }`}
                                                    >
                                                        {link.label}
                                                    </span>
                                                    {isActive && (
                                                        <span
                                                            className={`absolute bottom-2  ${
                                                                lang === "ar"
                                                                    ? "right-11 w-6"
                                                                    : "left-11 w-4.5"
                                                            } h-0.5 bg-tiny-pink rounded-lg`}
                                                        />
                                                    )}
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Mobile Language Selector Button */}
                                <div className="border-t border-gray-200 pt-2">
                                    <button
                                        onClick={() =>
                                            setShowLanguagePage(true)
                                        }
                                        className="flex items-center justify-between w-full px-4 py-4 text-tiny-black hover:bg-gray-50 rounded-lg transition duration-200"
                                    >
                                        <div className="flex items-center gap-3">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    className="text-tiny-black-200"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                                                />
                                            </svg>
                                            <span className="font-poppins-regular font-normal text-tiny-black-200 text-base">
                                                {dic?.navbar.language ||
                                                    "Language"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-medium font-poppins-medium text-tiny-black">
                                                {selectedLanguage.name}
                                            </span>
                                            <svg
                                                className={`w-4 h-4 ${
                                                    lang === "ar"
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    className="text-tiny-black-200"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </div>
                                    </button>
                                </div>

                                {/* Mobile Login Button */}
                                {!token && (
                                    <div className="mt-auto pt-6">
                                        <Link
                                            href={`/${lang}/login`}
                                            className={`flex items-center ${
                                                lang === "ar"
                                                    ? "flex-row-reverse"
                                                    : ""
                                            } justify-center gap-2 w-full rounded-xl bg-tiny-pink px-6 py-4`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <span className="text-base font-poppins-medium font-medium text-white">
                                                {dic?.navbar.login || "Login"}
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

                                {/* Logged in user options */}
                                {token && (
                                    <>
                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() =>
                                                    setShowProfilePage(true)
                                                }
                                                className="flex items-center justify-between w-full px-4 py-4 text-tiny-black hover:bg-gray-50 rounded-lg transition duration-200"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <MdOutlineAccountCircle
                                                        size={22}
                                                        className="text-tiny-black-200"
                                                    />
                                                    <span className="font-poppins-regular font-normal text-tiny-black-200 text-base">
                                                        {dic?.navbar.profile ||
                                                            "My Profile"}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <svg
                                                        className={`w-4 h-4 ${
                                                            lang === "ar"
                                                                ? "rotate-180"
                                                                : ""
                                                        }`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            className="text-tiny-black-200"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 5l7 7-7 7"
                                                        />
                                                    </svg>
                                                </div>
                                            </button>
                                            <button className="flex items-center gap-3 px-4 py-4 w-full text-tiny-black-200 hover:bg-gray-50 rounded-lg transition duration-200">
                                                <BsHandbag size={22} />
                                                <span className="font-poppins-regular font-normal text-tiny-black-200 text-base">
                                                    {dic?.navbar.orders ||
                                                        "Orders"}
                                                </span>
                                            </button>
                                            <button className="flex items-center gap-3 px-4 py-4 w-full text-tiny-black-200 hover:bg-gray-50 rounded-lg transition duration-200">
                                                <IoHeartOutline size={22} />
                                                <span className="font-poppins-regular font-normal text-tiny-black-200 text-base">
                                                    {dic?.navbar.wishlist ||
                                                        "Wishlist"}
                                                </span>
                                            </button>
                                            <button className="flex items-center gap-3 px-4 py-4 w-full text-tiny-black-200 hover:bg-gray-50 rounded-lg transition duration-200">
                                                <IoCartOutline size={22} />
                                                <span className="font-poppins-regular font-normal text-tiny-black-200 text-base">
                                                    {dic?.navbar.cart || "Cart"}
                                                </span>
                                            </button>
                                        </div>

                                        {/* Mobile Logout Button */}
                                        <div className="mt-auto pt-6">
                                            <button
                                                onClick={() =>
                                                    setShowLogoutConfirm(true)
                                                }
                                                className={`flex items-center ${
                                                    lang === "ar"
                                                        ? "flex-row-reverse"
                                                        : ""
                                                } justify-center gap-2 w-full rounded-xl bg-[#D90202] px-6 py-4 transition duration-200`}
                                            >
                                                <span className="text-base font-poppins-medium font-medium text-white">
                                                    {dic?.navbar.logout ||
                                                        "Logout"}
                                                </span>
                                                <svg
                                                    className="w-5 h-5 text-white"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </>
                                )}

                                {/* Logout Confirmation Popup */}
                                {showLogoutConfirm && (
                                    <>
                                        <div
                                            className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center px-4"
                                            onClick={() =>
                                                setShowLogoutConfirm(false)
                                            }
                                        >
                                            <div
                                                className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                <div className="text-center mb-6">
                                                    <div className="w-15 h-15 relative mx-auto">
                                                        <Image
                                                            src={
                                                                "/icons/logout.svg"
                                                            }
                                                            alt="logout-icon"
                                                            fill
                                                        />
                                                    </div>
                                                    <h3 className="text-[20px] font-poppins-semibold font-semibold text-tiny-black mb-2 mt-2">
                                                        {dic?.navbar
                                                            .logout_confirm ||
                                                            "Are you sure you want to Log Out?"}
                                                    </h3>
                                                </div>
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex-1 px-4 py-2.5 bg-[#D90202] text-white font-poppins-medium rounded-lg transition duration-200"
                                                    >
                                                        {dic?.navbar.logout ||
                                                            "Logout"}
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            setShowLogoutConfirm(
                                                                false
                                                            )
                                                        }
                                                        className="flex-1 px-4 py-2.5 text-[#D90202] border border-[#D90202] font-poppins-medium rounded-lg transition duration-200"
                                                    >
                                                        {dic?.navbar.cancel ||
                                                            "Cancel"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </>
                    ) : showLanguagePage ? (
                        <>
                            {/* Language Selection Page */}
                            <div className="flex justify-between items-center p-5 border-b border-gray-200">
                                <button
                                    onClick={() => setShowLanguagePage(false)}
                                    className="flex items-center gap-2 text-tiny-black"
                                >
                                    <svg
                                        className={`w-6 h-6 ${
                                            lang === "ar" ? "rotate-180" : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                    <span className="font-poppins-medium font-medium text-tiny-black text-[24px]">
                                        {dic?.navbar.language || "Language"}
                                    </span>
                                </button>
                                <button
                                    onClick={toggleMenu}
                                    className="flex items-center justify-center h-11 w-11 rounded-full hover:bg-gray-100 transition duration-200"
                                    aria-label="Close menu"
                                >
                                    <IoClose size={24} />
                                </button>
                            </div>

                            <div className="p-2">
                                <div className="flex flex-col gap-2">
                                    {languages.map((language) => (
                                        <button
                                            key={language.code}
                                            onClick={() => {
                                                handleLanguageSelect(language);
                                                setShowLanguagePage(false);
                                                setIsMenuOpen(false);
                                            }}
                                            disabled={isLoading}
                                            className={`w-full text-left px-6 py-4 rounded-lg transition duration-200 flex items-center justify-between `}
                                        >
                                            <span className="font-poppins-semi-bold font-semibold text-tiny-black text-base">
                                                {language.name}
                                            </span>
                                            {selectedLanguage.code ===
                                            language.code ? (
                                                <>
                                                    <div className="w-7 h-7 rounded-full flex justify-center items-center bg-tiny-pink">
                                                        <div className="w-4 h-4 rounded-full bg-[#E8EFF5]" />
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="w-7 h-7 rounded-full flex justify-center items-center bg-[#E8EFF5]" />
                                                </>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : showProfilePage ? (
                        <>
                            {/* Profile Options Page */}
                            <div className="flex justify-between items-center p-5 border-b border-gray-200">
                                <button
                                    onClick={() => setShowProfilePage(false)}
                                    className="flex items-center gap-2 text-tiny-black"
                                >
                                    <svg
                                        className={`w-6 h-6 ${
                                            lang === "ar" ? "rotate-180" : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                    <span className="font-poppins-medium font-medium text-tiny-black text-[24px]">
                                        {dic?.navbar.profile || "My Profile"}
                                    </span>
                                </button>
                                <button
                                    onClick={toggleMenu}
                                    className="flex items-center justify-center h-11 w-11 rounded-full hover:bg-gray-100 transition duration-200"
                                    aria-label="Close menu"
                                >
                                    <IoClose size={24} />
                                </button>
                            </div>

                            <div className="p-2">
                                <div className="flex flex-col gap-5">
                                    {menuProfileLinks.map((link, index) => {
                                        const isActive = pathname === link.href;

                                        return (
                                            <Link
                                                key={index}
                                                href={link.href}
                                                className="relative flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition duration-200"
                                            >
                                                {isActive
                                                    ? link.activeIcon
                                                    : link.icon}
                                                <span
                                                    className={` text-base  ${
                                                        isActive
                                                            ? "text-tiny-pink font-semibold font-poppins-semi-bold"
                                                            : "text-tiny-black-200 font-normal font-poppins-regular"
                                                    }`}
                                                >
                                                    {link.label}
                                                </span>
                                                {isActive && (
                                                    <span
                                                        className={`absolute  ${
                                                            lang === "ar"
                                                                ? "right-9.5 left-auto bottom-0 w-7"
                                                                : "left-9.5 bottom-1 w-4.5"
                                                        }  h-0.5 bg-tiny-pink rounded-lg`}
                                                    />
                                                )}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    ) : null}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
