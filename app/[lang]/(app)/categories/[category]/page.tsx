"use client";

import ProductCard from "@/components/ProductCard";
import { useGetProducts } from "@/hooks/useGetProducts";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri";

const page = () => {
    const [currentPage, setCurrentPage] = useState("1");
    const searchParams = useSearchParams();
    const { category } = useParams();
    console.log(category);

    const router = useRouter();
    const categoryId = searchParams.get("categoryId");
    const { products, links, meta, isLoading } = useGetProducts(
        categoryId as string
    );

    return (
        <div className="container mx-auto px-5 pb-30">
            <div className="pb-6 mb-6 border-b border-[#E6E6E6] flex flex-col gap-8">
                <div className="flex items-center gap-5">
                    <h1 className="text-xl font-semibold font-poppins-semi-bold text-tiny-black">
                        Filter Option
                    </h1>

                    <span className="underline text-sm font-semibold font-poppins-semi-bold text-[#E2B78C] cursor-pointer">
                        Clear All
                    </span>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="relative w-full lg:w-[20%]">
                        <div className="absolute -top-2 left-3 font-normal font-poppins-regular text-xs text-tiny-black bg-white px-2">
                            Size
                        </div>
                        <select
                            className="cursor-pointer rounded-[10px] border-[0.5px] border-black/15 font-medium font-poppins-medium text-xs text-tiny-black px-5 py-3.5 w-full outline-none"
                            name="size"
                        >
                            <option value="">Select Size</option>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </div>
                    <div className="relative w-full lg:w-[20%]">
                        <div className="absolute -top-2 left-3 font-normal font-poppins-regular text-xs text-tiny-black bg-white px-2">
                            Size
                        </div>
                        <select
                            className="cursor-pointer rounded-[10px] border-[0.5px] border-black/15 font-medium font-poppins-medium text-xs text-tiny-black px-5 py-3.5 w-full outline-none"
                            name="size"
                        >
                            <option value="">Select Size</option>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </div>
                    <div className="relative w-full lg:w-[20%]">
                        <div className="absolute -top-2 left-3 font-normal font-poppins-regular text-xs text-tiny-black bg-white px-2">
                            Size
                        </div>
                        <select
                            className="cursor-pointer rounded-[10px] border-[0.5px] border-black/15 font-medium font-poppins-medium text-xs text-tiny-black px-5 py-3.5 w-full outline-none"
                            name="size"
                        >
                            <option value="">Select Size</option>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </div>
                    <div className="relative w-full lg:w-[20%]">
                        <div className="absolute -top-2 left-3 font-normal font-poppins-regular text-xs text-tiny-black bg-white px-2">
                            Size
                        </div>
                        <select
                            className="cursor-pointer rounded-[10px] border-[0.5px] border-black/15 font-medium font-poppins-medium text-xs text-tiny-black px-5 py-3.5 w-full outline-none"
                            name="size"
                        >
                            <option value="">Select Size</option>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {isLoading ? (
                    <p>Loading products...</p>
                ) : (
                    <>
                        {products.map((product) => (
                            <div
                                onClick={() => {
                                    const productName = product.name
                                        .split(" ")
                                        .join("-");
                                    router.push(
                                        `${category}/${productName}?productId=${product.id}`
                                    );
                                }}
                                key={product.id}
                            >
                                <ProductCard image="1" product={product} />
                            </div>
                        ))}
                    </>
                )}
            </div>

            <div className="p-4 w-full flex items-center justify-center gap-1.25 mt-10">
                <button
                    onClick={() => {
                        if (links?.first) {
                            const pageNum = links?.first.split("page=")[1];
                            setCurrentPage(pageNum);
                        }
                    }}
                    className={`w-8 h-8 flex justify-center items-center cursor-pointer rounded-lg p-2.5 font-semibold font-poppins-semi-bold  border border-[#F1F1F1] text-tiny-black`}
                >
                    <RiArrowLeftDoubleFill size={20} />
                </button>
                {meta?.links.map((link: any, index: number) => (
                    <button
                        onClick={() => {
                            if (link.url) {
                                const pageNum = link.url.split("page=")[1];
                                setCurrentPage(pageNum);
                            }
                        }}
                        className={`w-8 h-8 flex justify-center items-center cursor-pointer ${
                            link.active
                                ? "border-[1.5px] border-tiny-pink text-tiny-pink"
                                : "border border-[#F1F1F1] text-tiny-black"
                        } disabled:opacity-15 disabled:cursor-not-allowed rounded-lg p-2.5 font-semibold font-poppins-semi-bold text-[13px]`}
                        key={index}
                        disabled={
                            (link.label.includes("Previous") && !link.url) ||
                            (link.label.includes("Next") && !link.url)
                        }
                    >
                        {link.label.includes("Previous") ? (
                            <FaAngleLeft />
                        ) : link.label.includes("Next") ? (
                            <FaAngleRight />
                        ) : (
                            link.label
                        )}
                    </button>
                ))}
                <button
                    onClick={() => {
                        if (links?.last) {
                            const pageNum = links?.last.split("page=")[1];
                            setCurrentPage(pageNum);
                        }
                    }}
                    className={`w-8 h-8 flex justify-center items-center cursor-pointer rounded-lg p-2.5 font-semibold font-poppins-semi-bold  border border-[#F1F1F1] text-tiny-black`}
                    disabled={!links?.last}
                >
                    <RiArrowRightDoubleFill />
                </button>
            </div>
        </div>
    );
};

export default page;
