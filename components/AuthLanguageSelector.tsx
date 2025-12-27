"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const AuthLanguageSelector = () => {
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

    return (
        <div className="absolute top-5 left-4 z-30">
            <div className="relative">
                <button
                    type="button"
                    onClick={() =>
                        setShowLanguageDropdown(!showLanguageDropdown)
                    }
                    disabled={isLoading}
                    className="cursor-pointer text-tiny-black text-[16px] lg:text-xl font-medium font-poppins-medium flex items-center gap-1 hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span>{selectedLanguage.name}</span>
                    <svg
                        className={`w-4 h-4 transition-transform ${
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

                {showLanguageDropdown && (
                    <>
                        <div
                            className="fixed inset-0 z-30"
                            onClick={() => setShowLanguageDropdown(false)}
                        />
                        <div className="z-30 absolute top-full left-0 mt-2 w-40 bg-white border border-black/15 rounded-lg shadow-lg overflow-hidden">
                            {languages.map((language) => (
                                <button
                                    key={language.code}
                                    type="button"
                                    onClick={() =>
                                        handleLanguageSelect(language)
                                    }
                                    disabled={isLoading}
                                    className={`cursor-pointer w-full text-left px-4 py-3 text-[16px] font-medium font-poppins-medium transition-colors disabled:cursor-not-allowed ${
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
        </div>
    );
};

export default AuthLanguageSelector;
