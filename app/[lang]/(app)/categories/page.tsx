"use client";
import { useGetCategories } from "@/hooks/useGetCategories";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/ui/Loading";
import Pagination from "@/components/ui/Pagination";
import { useLanguage } from "@/contexts/LanguageContext";

const page = () => {
    const router = useRouter();
    const { lang } = useLanguage();
    const [currentPage, setCurrentPage] = useState("1");
    const { categories, links, meta, isLoading } =
        useGetCategories(currentPage);

    return (
        <>
            <div className="container mx-auto px-5 pb-30">
                {isLoading ? (
                    <div className="h-screen w-full flex justify-center items-center">
                        <Loading width="100" height="100" />
                    </div>
                ) : categories.length === 0 ? (
                    <div className="w-full h-[50vh] flex items-center justify-center">
                        <div className="flex flex-col items-center">
                            <div className="relative w-24 h-24">
                                <Image
                                    src={"/icons/faqs-notfound.svg"}
                                    fill
                                    alt="empty-box"
                                />
                            </div>
                            <span className="mt-4 text-tiny-black font-poppins-medium font-medium text-base">
                                {lang === "ar"
                                    ? "لا توجد عناصر متاحة في هذه الفئة حتى الآن. يرجى التحقق مرة أخرى لاحقًا للحصول على التحديثات!"
                                    : "No items available in this category yet. Please check back later for updates!"}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-7 gap-4 min-h-[calc(100vh-60px)]">
                        {categories.map((category: any) => (
                            <div
                                key={category.id}
                                onClick={() => {
                                    const categoryName = category.name
                                        .split(" ")
                                        .join("-");
                                    router.push(`categories/${category.id}`);
                                }}
                                className="flex flex-col items-center gap-1 cursor-pointer"
                            >
                                <div className="bg-[#E6E6E64D] w-43 h-43 lg:w-39.25 lg:h-39.25 rounded-full flex items-center justify-center p-4">
                                    <Image
                                        src={"/icons/t-shirt.svg"}
                                        alt={""}
                                        width={72}
                                        height={72}
                                        className="object-cover"
                                    />
                                </div>
                                <span className="font-poppins-medium font-medium text-tiny-black text-base">
                                    {category.name}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
                {links && meta && categories.length > 0 && (
                    <Pagination
                        links={{
                            first: links.first ?? undefined,
                            last: links.last ?? undefined,
                        }}
                        meta={meta}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>
        </>
    );
};

export default page;
