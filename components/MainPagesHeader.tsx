"use client";
import SectionName from "./ui/SectionName";
import Breadcrumb from "./ui/Breadcrumb";
import { usePathname } from "next/navigation";

const pagesName = [
    { routeLink: "categories", name: "Our Categories" },
    { routeLink: "about", name: "About Us" },
    { routeLink: "contact", name: "Contact Us" },
    { routeLink: "profile", name: "My Profile" },
];

const MainPagesHeader = () => {
    const pathname = usePathname();

    const pathSegments = pathname.split("/").filter((segment) => segment);

    const lang = pathSegments[0];
    const segments = pathSegments
        .slice(1)
        .map((segment) => decodeURIComponent(segment));

    const formatSegmentName = (segment: string) => {
        const decodedSegment = decodeURIComponent(segment);

        // Check if it matches any predefined page names
        const matchedPage = pagesName.find(
            (page) => page.routeLink === decodedSegment
        );
        if (matchedPage) {
            return matchedPage.name;
        }

        // If it's already in a readable format (Arabic or contains spaces), return as is
        if (
            /[\u0600-\u06FF]/.test(decodedSegment) ||
            decodedSegment.includes(" ")
        ) {
            return decodedSegment;
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
                                    pathSegments.slice(-1)[0]
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
