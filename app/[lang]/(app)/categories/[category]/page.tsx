"use client";

import ProductCard from "@/components/ProductCard";
import Loading from "@/components/ui/Loading";
import Pagination from "@/components/ui/Pagination";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGetProducts } from "@/hooks/useGetProducts";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
    const [currentPage, setCurrentPage] = useState("1");
    const [selectedFilters, setSelectedFilters] = useState<
        Array<{ id: number; value: string }>
    >([]);
    const { category } = useParams();
    const { lang } = useLanguage();
    const router = useRouter();
    const { products, links, meta, isLoading, attributes } = useGetProducts(
        category as string,
        selectedFilters
    );

    const handleFilterChange = (attributeId: number, value: string) => {
        if (!value) {
            // Remove filter if value is empty
            setSelectedFilters((prev) =>
                prev.filter((f) => f.id !== attributeId)
            );
        } else {
            // Update or add filter
            setSelectedFilters((prev) => {
                const existing = prev.find((f) => f.id === attributeId);
                if (existing) {
                    return prev.map((f) =>
                        f.id === attributeId ? { id: attributeId, value } : f
                    );
                }
                return [...prev, { id: attributeId, value }];
            });
        }
    };

    const handleClearAll = () => {
        setSelectedFilters([]);
    };

    return (
        <div className="container mx-auto px-5 pb-30">
            <div className="pb-6 mb-6 border-b border-[#E6E6E6] flex flex-col gap-8">
                <div className="flex items-center gap-5">
                    <h1 className="text-xl font-semibold font-poppins-semi-bold text-tiny-black">
                        {lang === "ar" ? "الفلاتر" : "Filter Options"}
                    </h1>

                    <span
                        onClick={handleClearAll}
                        className="underline text-sm font-semibold font-poppins-semi-bold text-[#E2B78C] cursor-pointer"
                    >
                        {lang === "ar" ? "مسح الكل" : "Clear All"}
                    </span>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {attributes?.map((attr: any) => {
                        return (
                            <div
                                key={attr.id}
                                className="relative w-full lg:w-[20%]"
                            >
                                <div
                                    className={`absolute -top-2 ${
                                        lang === "ar" ? "right-3" : "left-3"
                                    } font-normal font-poppins-regular text-xs text-tiny-black bg-white px-2`}
                                >
                                    {attr.name}
                                </div>
                                <select
                                    className="cursor-pointer rounded-[10px] border-[0.5px] border-black/15 font-medium font-poppins-medium text-xs text-tiny-black px-5 py-3.5 w-full outline-none"
                                    name={`attribute-${attr.id}`}
                                    value={
                                        selectedFilters.find(
                                            (f) => f.id === attr.id
                                        )?.value || ""
                                    }
                                    onChange={(e) =>
                                        handleFilterChange(
                                            attr.id,
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">
                                        {lang === "ar"
                                            ? `اختر ${attr.name}`
                                            : `Select ${attr.name}`}
                                    </option>
                                    {attr.values.map((value: any) => (
                                        <option
                                            key={value.name}
                                            value={value.name}
                                        >
                                            {value.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        );
                    })}
                </div>
            </div>

            {isLoading ? (
                <div className="w-full h-screen flex items-center justify-center">
                    <Loading width="100" height="100" />
                </div>
            ) : products.length === 0 ? (
                <div className="w-full h-[50vh] flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <div className="relative w-24 h-24">
                            <Image
                                src={"/icons/out-stock.webp"}
                                fill
                                alt="out-of-stock"
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
                <>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {products.map((product) => (
                            <div
                                onClick={() => {
                                    router.push(
                                        `${category}/product-details?productId=${product.id}`
                                    );
                                }}
                                key={product.id}
                                className="cursor-pointer"
                            >
                                <ProductCard image="1" product={product} />
                            </div>
                        ))}
                    </div>
                    {links && meta && (
                        <Pagination
                            links={{
                                first: links.first ?? undefined,
                                last: links.last ?? undefined,
                            }}
                            meta={meta}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default page;
