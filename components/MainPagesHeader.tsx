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
    const segments = pathSegments.slice(1);

    const formatSegmentName = (segment: string) => {
        pagesName.forEach((page) => {
            if (page.routeLink === segment) {
                segment = page.name;
            }
        });

        return segment
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
                            <SectionName secName={formatSegmentName(pathSegments.slice(-1)[0])} />
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
