"use client";
import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useLanguage } from "@/contexts/LanguageContext";

const productImages = [
    "/images/main-item.webp",
    "/images/preview-item1.webp",
    "/images/preview-item2.webp",
    "/images/preview-item3.webp",
];

export default function ProductImagesPreview() {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const { lang } = useLanguage();

    return (
        <div className="w-full lg:w-130 flex flex-col relative">
            <div className="relative">
                <Swiper
                    spaceBetween={10}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    }}
                    thumbs={{ swiper: thumbsSwiper }}
                    pagination={true}
                    onSlideChange={(swiper) => {
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                    }}
                    modules={[FreeMode, Navigation, Thumbs, Pagination]}
                    className="product-images-preview"
                >
                    {productImages.map((imgSrc, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative w-full h-96 md:h-125 bg-[#F5F5F5] rounded-2xl overflow-hidden">
                                <div className="bg-[#F5F5F5] absolute top-0 w-full h-18 bg-linear-to-t from-[#f4f4f4]/20 to-black/30" />
                                <Image
                                    fill
                                    alt="product"
                                    src={imgSrc}
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div
                    className={`absolute w-full flex justify-between items-center top-[50%] -translate-y-1/2 z-10 px-2 ${
                        lang === "ar" ? "" : ""
                    }`}
                >
                    <button
                        className="swiper-button-prev disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer w-8 h-8 rounded-full bg-tiny-pink flex justify-center items-center text-white"
                        aria-label={
                            lang === "ar" ? "Next slide" : "Previous slide"
                        }
                        disabled={lang === "ar" ? isEnd : isBeginning}
                    >
                        {lang === "ar" ? (
                            <FaAngleRight size={13} />
                        ) : (
                            <FaAngleLeft size={13} />
                        )}
                    </button>
                    <button
                        className="swiper-button-next disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer w-8 h-8 rounded-full bg-tiny-pink flex justify-center items-center text-white"
                        aria-label={
                            lang === "ar" ? "Previous slide" : "Next slide"
                        }
                        disabled={lang === "ar" ? isBeginning : isEnd}
                    >
                        {lang === "ar" ? (
                            <FaAngleLeft size={13} />
                        ) : (
                            <FaAngleRight size={13} />
                        )}
                    </button>
                </div>
            </div>
            <Swiper
                onSwiper={(swiper: SwiperType) => setThumbsSwiper(swiper)}
                spaceBetween={10}
                slidesPerView={3}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="w-full"
            >
                {productImages.map((imgSrc, index) => (
                    <SwiperSlide key={index} className="cursor-pointer">
                        <div className="relative w-full h-24 md:h-32 rounded-2xl bg-[#F5F5F5] mt-1.5 overflow-hidden">
                            <Image
                                alt="product"
                                src={imgSrc}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
