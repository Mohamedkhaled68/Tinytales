"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

// import "swiper/css/pagination";
const categories = [
    {
        id: 5,
        name: "Girls",
        image: "https://tinytales.trendline.marketing/default-images/default.png",
    },
    {
        id: 10,
        name: "Category 2",
        image: "https://tinytales.trendline.marketing/default-images/default.png",
    },
    {
        id: 11,
        name: "Category 3",
        image: "https://tinytales.trendline.marketing/default-images/default.png",
    },
    {
        id: 13,
        name: "Category 5",
        image: "https://tinytales.trendline.marketing/default-images/default.png",
    },
    {
        id: 14,
        name: "Category 6",
        image: "https://tinytales.trendline.marketing/default-images/default.png",
    },
    {
        id: 16,
        name: "Category 8",
        image: "https://tinytales.trendline.marketing/default-images/default.png",
    },
    {
        id: 18,
        name: "Category 10",
        image: "https://tinytales.trendline.marketing/default-images/default.png",
    },
    {
        id: 19,
        name: "Category 11",
        image: "https://tinytales.trendline.marketing/default-images/default.png",
    },
    {
        id: 21,
        name: "Category 13",
        image: "https://tinytales.trendline.marketing/default-images/default.png",
    },
    {
        id: 23,
        name: "Category 15",
        image: "https://tinytales.trendline.marketing/default-images/default.png",
    },
];

const CategoriesSlider = () => {
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    return (
        <section className="mt-14 flex flex-col container mx-auto px-5">
            <div className="flex flex-col gap-0.5">
                <div className="relative w-fit">
                    <h1 className="font-poppins-semi-bold font-semibold text-[16px] text-tiny-black">
                        Our Categories
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
            <div className="mt-5">
                <Swiper
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        640: {
                            slidesPerView: 3,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 7.5,
                            spaceBetween: 10,
                        },
                    }}
                    navigation={{
                        nextEl: ".swiper-button-next-our-categories",
                        prevEl: ".swiper-button-prev-our-categories",
                    }}
                    pagination={true}
                    onSlideChange={(swiper) => {
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                    }}
                    modules={[Navigation]}
                >
                    {categories.map((category) => (
                        <SwiperSlide key={category.id} className="w-auto">
                            <div className="flex flex-col items-center gap-1">
                                <div className="relative w-40 h-40 p-11 rounded-full bg-[#E6E6E64D]">
                                    <Image
                                        src={"/icons/t-shirt.svg"}
                                        alt={category.name}
                                        width={72}
                                        height={72}
                                        className="object-cover"
                                    />
                                </div>
                                <p className="font-poppins-medium font-medium text-[16px] text-tiny-black">
                                    {category.name}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="mt-10 flex justify-center items-center gap-3 w-fit mx-auto">
                <button
                    className="swiper-button-prev-our-categories disabled:cursor-not-allowed disabled:opacity-20 cursor-pointer w-12.5 h-12.5 rounded-full bg-[#E8EDF2] flex justify-center items-center text-tiny-black"
                    aria-label="Previous slide"
                    disabled={isBeginning}
                >
                    <FaAngleLeft size={24} />
                </button>
                <button
                    className="swiper-button-next-our-categories disabled:cursor-not-allowed disabled:opacity-20 cursor-pointer w-12.5 h-12.5 rounded-full bg-tiny-pink flex justify-center items-center text-white"
                    aria-label="Next slide"
                    disabled={isEnd}
                >
                    <FaAngleRight size={24} />
                </button>
            </div>
        </section>
    );
};

export default CategoriesSlider;
