"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Category } from "@/types/Home";

// Import Swiper styles
import "swiper/css";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";

const CategoriesSlider = ({ categories }: { categories: Category[] }) => {
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const router = useRouter();
    const { lang } = useLanguage();
    return (
        <section className="mt-14 flex flex-col container mx-auto px-5">
            <div className="flex flex-col gap-0.5">
                <div className="relative w-full">
                    <h1 className="font-poppins-semi-bold font-semibold text-[16px] lg:text-[24px] text-tiny-black">
                        {lang === "ar" ? "فئاتنا" : "Our Categories"}
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
                <div className="w-10 bg-tiny-pink h-1 rounded-2xl" />
            </div>
            <div className="mt-5">
                <Swiper
                    breakpoints={{
                        0: {
                            slidesPerView: 2.5,
                            spaceBetween: 20,
                        },
                        640: {
                            slidesPerView: 3.5,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 4.5,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 7,
                            spaceBetween: 20,
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
                            <div
                                onClick={() =>
                                    router.push(
                                        `/${lang}/categories/${category.name}?categoryId=${category.id}`
                                    )
                                }
                                className="flex flex-col items-center gap-1"
                            >
                                <div className="relative w-36 h-36 p-11 rounded-full bg-[#E6E6E64D]">
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
        </section>
    );
};

export default CategoriesSlider;
