"use client";
import { useGetCategories } from "@/hooks/useGetCategories";
import Image from "next/image";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { RiArrowLeftDoubleFill } from "react-icons/ri";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState("1");
    const { categories, links, meta, isLoading } =
        useGetCategories(currentPage);

    return (
        <>
            <div className="container mx-auto px-5 pb-30">
                <div className="grid grid-cols-2 lg:grid-cols-7 gap-4 min-h-[calc(100vh-60px)]">
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        categories.map((category: any) => (
                            <div
                                key={category.id}
                                onClick={() => {
                                    const categoryName = category.name
                                        .split(" ")
                                        .join("-");
                                    router.push(
                                        `categories/${categoryName}?categoryId=${category.id}`
                                    );
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
                        ))
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
                                (link.label.includes("Previous") &&
                                    !link.url) ||
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
        </>
    );
};

export default page;
