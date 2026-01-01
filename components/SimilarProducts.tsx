"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import ProductCard from "./ProductCard";
import "swiper/css";
import { Product } from "@/types/Product";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const SimilarProducts = ({ similar }: { similar: Product[] }) => {
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const { lang } = useLanguage();

    return (
        <div className="mb-24">
            {/* heading */}
            <div className="flex flex-col gap-0.5">
                <div className="relative w-fit">
                    <h1 className="font-poppins-semi-bold font-semibold text-[16px] lg:text-[24px] text-tiny-black">
                        {lang === "ar" ? "منتجات مشابهة" : "Similar Products"}
                    </h1>
                    <Image
                        src={"/images/heading-logo.svg"}
                        alt="favicon"
                        width={100}
                        height={70}
                        style={{ zIndex: "-1" }}
                        className={`absolute w-18 lg:w-25 ${
                            lang === "ar" ? "-right-2 scale-x-[-1]" : "left-0"
                        } bottom-1`}
                    />
                </div>
                <div className="w-10 lg:w-16 bg-tiny-pink h-1 rounded-2xl" />
            </div>

            <Swiper
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }}
                onSlideChange={(swiper) => {
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                }}
                modules={[Navigation]}
                spaceBetween={40}
                breakpoints={{
                    0: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                }}
                className="mt-4"
            >
                {similar.map((product, i) => (
                    <SwiperSlide key={product.id || i}>
                        <Link href={`product-details?productId=${product.id}`}>
                            <ProductCard image={`1`} product={product} />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div
                className={`mt-10 flex justify-center ${
                    lang === "ar" ? "flex-row-reverse" : "flex-row"
                } items-center gap-3 w-fit mx-auto`}
            >
                <button
                    className="swiper-button-prev-our-categories disabled:cursor-not-allowed disabled:opacity-20 cursor-pointer w-12.5 h-12.5 rounded-full bg-tiny-pink flex justify-center items-center text-white disabled:text-tiny-black"
                    aria-label={lang === "ar" ? "Next slide" : "Previous slide"}
                    disabled={isBeginning}
                >
                    <FaAngleLeft size={24} />
                </button>
                <button
                    className="swiper-button-next-our-categories disabled:cursor-not-allowed disabled:opacity-20 cursor-pointer w-12.5 h-12.5 rounded-full bg-tiny-pink flex justify-center items-center text-white disabled:text-tiny-black"
                    aria-label={lang === "ar" ? "Previous slide" : "Next slide"}
                    disabled={isEnd}
                >
                    <FaAngleRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default SimilarProducts;
