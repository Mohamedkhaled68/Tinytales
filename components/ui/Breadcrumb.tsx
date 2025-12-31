"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaAngleRight } from "react-icons/fa6";

interface BreadcrumbProps {
    lang: string;
    segments: string[];
    formatSegmentName: (segment: string) => string;
}

const Breadcrumb = ({ lang, segments, formatSegmentName }: BreadcrumbProps) => {
    return (
        <nav className="container mx-auto px-5">
            <ol className="bg-[#ECECEC66] rounded-2xl p-4 flex items-center flex-wrap gap-2">
                {/* Home */}
                <li className="flex items-center gap-0.5">
                    <Link
                        href={`/${lang}`}
                        className="font-poppins-medium font-medium text-tiny-black text-xs hover:underline cursor-pointer"
                    >
                        Home
                    </Link>
                    {segments.length > 0 && (
                        <FaAngleRight size={24} className="text-tiny-black" />
                    )}
                </li>

                {/* Dynamic segments */}
                {segments.map((segment, index) => {
                    const isLast = index === segments.length - 1;
                    const href = `/${lang}/${segments
                        .slice(0, index + 1)
                        .join("/")}`;

                    return (
                        <li key={segment} className="flex items-center gap-0.5">
                            {isLast ? (
                                <span className="font-poppins-medium font-medium text-tiny-black-200 text-xs">
                                    {formatSegmentName(segment)}
                                </span>
                            ) : (
                                <>
                                    <Link
                                        href={href}
                                        className="font-poppins-medium font-medium text-tiny-black text-xs hover:underline cursor-pointer"
                                    >
                                        {formatSegmentName(segment)}
                                    </Link>
                                    <FaAngleRight
                                        size={24}
                                        className="text-tiny-black"
                                    />
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
