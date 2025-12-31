"use client";
import Image from "next/image";
import { GiRoundStar } from "react-icons/gi";
import { RiDoubleQuotesR } from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { CustomerFeedback } from "@/types/Home";
import { useLanguage } from "@/contexts/LanguageContext";

const Reviews = ({
    customerFeedback,
}: {
    customerFeedback: CustomerFeedback[];
}) => {
    const { lang } = useLanguage();
    return (
        <section className="mt-14 container mx-auto px-5 relative reviews-slider">
            <div className="flex flex-col gap-0.5">
                <div className="relative w-full">
                    <h1 className="font-poppins-semi-bold font-semibold text-[16px] lg:text-[24px] text-tiny-black">
                        {lang === "ar" ? "آراء العملاء" : "Reviews"}
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
            <p className="mt-4 text-xs font-normal font-poppins-regular text-tiny-black">
                {lang === "ar"
                    ? `اكتشف ما يقوله عملاؤنا عن منتجاتنا وخدماتنا من خلال مراجعاتهم الصادقة - وانضم إليهم في تجربة تسوق فريدة.`
                    : `Discover what our customers are saying about our products and
                services through their honest reviews — and join them in a
                unique shopping experience.`}
            </p>

            <div className="relative mt-6 mb-30">
                <Swiper
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3.5,
                            spaceBetween: 10,
                        },
                    }}
                    pagination={true}
                    modules={[Pagination]}
                >
                    {customerFeedback.map((review) => (
                        <SwiperSlide
                            key={review.id}
                            className="w-auto h-45 mb-10"
                        >
                            <div className="rounded-3xl p-4 bg-[#F4F7F9] flex flex-col justify-between gap-4 h-full">
                                <div className="flex items-center justify-between">
                                    <RiDoubleQuotesR className="text-tiny-black-400 text-4xl lg:text-5xl" />
                                    <div className="border-2 border-tiny-pink p-2 rounded-lg flex items-center gap-1">
                                        <GiRoundStar className="text-tiny-pink" />
                                        <span className="text-xs text-tiny-black font-medium font-poppins-regular">
                                            {review.rating}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-xs text-tiny-black font-medium font-poppins-regular w-[98%]">
                                    {review.description}
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-black"></div>
                                    <div className="flex flex-col">
                                        <h1 className="font-poppins-medium font-medium text-sm text-tiny-black">
                                            {review.name}
                                        </h1>
                                        <p className="text-[10px] text-tiny-black-200 font-medium font-poppins-regular">
                                            {review.subtitle}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Reviews;
