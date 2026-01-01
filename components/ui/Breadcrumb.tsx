"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useLanguage } from "@/contexts/LanguageContext";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { useEffect, useState } from "react";

interface BreadcrumbProps {
    lang: string;
    segments: string[];
    formatSegmentName: (segment: string) => string;
}

const Breadcrumb = ({ lang, segments, formatSegmentName }: BreadcrumbProps) => {
    const { lang: currentLang } = useLanguage();
    const router = useRouter();
    const [dic, setDic] = useState<any>(null);

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(currentLang as "en" | "ar");
            setDic(dictionary);
        };
        fetchDictionary();
    }, [currentLang]);
    return (
        <nav className="container mx-auto px-5">
            <ol className="bg-[#ECECEC66] rounded-2xl p-4 flex items-center flex-wrap gap-2">
                {/* Home */}
                <li className="flex items-center gap-0.5">
                    <Link
                        href={`/${lang}`}
                        className="font-poppins-medium font-medium text-tiny-black text-xs hover:underline cursor-pointer"
                    >
                        {dic?.breadcrumb?.home || "Home"}
                    </Link>
                    {segments.length > 0 &&
                        (lang === "ar" ? (
                            <FaAngleLeft
                                size={24}
                                className="text-tiny-black"
                            />
                        ) : (
                            <FaAngleRight
                                size={24}
                                className="text-tiny-black"
                            />
                        ))}
                </li>

                {/* Dynamic segments */}
                {segments.map((segment, index) => {
                    const isLast = index === segments.length - 1;
                    const isNumber = !isNaN(Number(segment));

                    if (isNumber) return null;

                    return (
                        <li key={segment} className="flex items-center gap-0.5">
                            {isLast ? (
                                <span className="font-poppins-medium font-medium text-tiny-black-200 text-xs">
                                    {formatSegmentName(segment)}
                                </span>
                            ) : (
                                <>
                                    <button
                                        onClick={() => router.back()}
                                        className="font-poppins-medium font-medium text-tiny-black text-xs hover:underline cursor-pointer bg-transparent border-none p-0"
                                    >
                                        {formatSegmentName(segment)}
                                    </button>
                                    {lang === "ar" ? (
                                        <FaAngleLeft
                                            size={24}
                                            className="text-tiny-black"
                                        />
                                    ) : (
                                        <FaAngleRight
                                            size={24}
                                            className="text-tiny-black"
                                        />
                                    )}
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
