"use client";
import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import ProductCard from "./ProductCard";
import "swiper/css";

const SimilarProducts = () => {
    const prevRef = useRef<HTMLDivElement | null>(null);
    const nextRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className="mb-24">
            <div className="flex flex-col gap-0.5">
                <div className="relative w-fit">
                    <h1 className="font-poppins-semi-bold font-semibold text-[16px] text-tiny-black">
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
                <div className="w-10 bg-tiny-pink h-1 rounded-2xl" />
            </div>

            <Swiper
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    if (swiper.params.navigation) {
                        (swiper.params.navigation as any).prevEl =
                            prevRef.current;
                        (swiper.params.navigation as any).nextEl =
                            nextRef.current;
                    } else {
                        swiper.params.navigation = {
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        } as any;
                    }
                }}
                modules={[Navigation]}
                spaceBetween={40}
                slidesPerView={2}
                className="mySwiper mt-4"
            >
                {Array.from({ length: 4 }, (_, i) => (
                    <SwiperSlide key={i}>
                        <ProductCard
                            added={false}
                            liked={false}
                            image={`${i + 1}`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="mt-10 flex justify-center items-center gap-3 w-fit mx-auto">
                <div
                    ref={prevRef}
                    className="cursor-pointer w-12.5 h-12.5 rounded-full bg-[#E8EDF2] flex justify-center items-center text-tiny-black"
                >
                    <FaAngleLeft size={24} />
                </div>
                <div
                    ref={nextRef}
                    className="cursor-pointer w-12.5 h-12.5 rounded-full bg-tiny-pink flex justify-center items-center text-white"
                >
                    <FaAngleRight size={24} />
                </div>
            </div>
        </div>
    );
};

export default SimilarProducts;
