"use client";
import SectionName from "./ui/SectionName";
import Breadcrumb from "./ui/Breadcrumb";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { useEffect, useState } from "react";

const MainPagesHeader = () => {
    const pathname = usePathname();
    const { lang: currentLang } = useLanguage();
    const [dic, setDic] = useState<any>(null);

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(currentLang as "en" | "ar");
            setDic(dictionary);
        };
        fetchDictionary();
    }, [currentLang]);

    const pathSegments = pathname.split("/").filter((segment) => segment);

    const lang = pathSegments[0];
    const segments = pathSegments
        .slice(1)
        .map((segment) => decodeURIComponent(segment));

    const formatSegmentName = (segment: string) => {
        const decodedSegment = decodeURIComponent(segment);

        if (!dic) return decodedSegment;

        // Check if we're on a product page (categories/category/product)
        if (segments.length === 3 && segments[0] === "categories") {
            // This is a product page - the last segment is the product
            if (segment === segments[segments.length - 1]) {
                return dic.breadcrumb?.product_details || "Product Details";
            }
        }

        // Check if it matches any predefined page names in translations
        const translationMap: { [key: string]: string } = {
            categories: dic.breadcrumb?.categories || "Our Categories",
            about: dic.breadcrumb?.about || "About Us",
            contact: dic.breadcrumb?.contact || "Contact Us",
            profile: dic.breadcrumb?.profile || "My Profile",
        };

        if (translationMap[decodedSegment]) {
            return translationMap[decodedSegment];
        }

        // Otherwise, format kebab-case to Title Case
        return decodedSegment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };
    return (
        <>
            {segments.length > 0 && (
                <div className="flex flex-col gap-4 mb-8">
                    {!pathname.includes("/cart") &&
                        !pathname.includes("/profile") &&
                        !pathname.includes("/notifications") && (
                            <SectionName
                                secName={formatSegmentName(
                                    (() => {
                                        const lastSegment =
                                            segments.slice(-1)[0];
                                        // If last segment is a number, use the previous segment
                                        if (
                                            /^\d+$/.test(lastSegment) &&
                                            segments.length > 1
                                        ) {
                                            return segments.slice(-2)[0];
                                        }
                                        return lastSegment;
                                    })()
                                )}
                            />
                        )}
                    <Breadcrumb
                        lang={lang}
                        segments={segments}
                        formatSegmentName={formatSegmentName}
                    />
                </div>
            )}
        </>
    );
};

export default MainPagesHeader;
