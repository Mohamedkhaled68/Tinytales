"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import ProductCard from "./ProductCard";
import "swiper/css";

const SimilarProducts = () => {
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    return (
        <div className="mb-24">
            {/* heading */}
            <div className="flex flex-col gap-0.5">
                <div className="relative w-fit">
                    <h1 className="font-poppins-semi-bold font-semibold text-[16px] lg:text-[24px] text-tiny-black">
                        Similar Products
                    </h1>
                    <Image
                        src={"/images/heading-logo.svg"}
                        alt="favicon"
                        width={59}
                        height={37}
                        style={{ zIndex: "-1" }}
                        className="absolute left-0 bottom-1"
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
                {Array.from({ length: 4 }, (_, i) => (
                    <SwiperSlide key={i}>
                        {/* <ProductCard  image={`${i + 1}`} />/ */}
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="mt-10 flex justify-center items-center gap-3 w-fit mx-auto">
                <button
                    className="swiper-button-prev disabled:cursor-not-allowed disabled:opacity-20 cursor-pointer w-12.5 h-12.5 rounded-full bg-[#E8EDF2] flex justify-center items-center text-tiny-black"
                    aria-label="Previous slide"
                    disabled={isBeginning}
                >
                    <FaAngleLeft size={24} />
                </button>
                <button
                    className="swiper-button-next disabled:cursor-not-allowed disabled:opacity-20 cursor-pointer w-12.5 h-12.5 rounded-full bg-tiny-pink flex justify-center items-center text-white"
                    aria-label="Next slide"
                    disabled={isEnd}
                >
                    <FaAngleRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default SimilarProducts;
