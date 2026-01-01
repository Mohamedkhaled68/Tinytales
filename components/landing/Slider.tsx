import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { TbBrandFacebook } from "react-icons/tb";
import { SlSocialLinkedin } from "react-icons/sl";
import { RiTelegram2Line } from "react-icons/ri";
import { TbBrandWhatsapp } from "react-icons/tb";
import type { Slider } from "@/types/Home";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCommunications } from "@/contexts/CommunicationsContext";
import Link from "next/link";

const Slider = ({ sliders }: { sliders: Slider[] }) => {
    const { lang } = useLanguage();
    const { communications } = useCommunications();

    return (
        <div className="relative min-h-120 lg:min-h-130 bg-tiny-black py-6 px-7">
            <div
                className={`absolute top-0 w-full h-full ${
                    lang === "ar"
                        ? "bg-linear-to-r lg:bg-linear-to-r right-0"
                        : "bg-linear-to-l lg:bg-linear-to-l left-0"
                } z-10 from-black/40 to-black/70  lg:from-[rgba(217,217,217,0)] via-black/70 lg:to-black/70`}
            />

            <div
                className={`home-slider absolute left-1/2 -translate-x-1/2 ${
                    lang === "ar" ? "lg:right-30" : "lg:left-30 "
                }  lg:translate-x-0 w-[80%] lg:max-w-[50%] z-20 lg:top-16.75`}
            >
                {/* slider content */}
                <Swiper
                    speed={900}
                    parallax={true}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                    }}
                    navigation={true}
                    modules={[Parallax, Pagination, Autoplay]}
                    className="home-slider relative h-50"
                >
                    {sliders.map((slider) => (
                        <SwiperSlide key={slider.id}>
                            <div className="flex flex-col items-center lg:items-start justify-center gap-4">
                                {slider.sale && (
                                    <div className="bg-white px-4 py-3.25 rounded-[40px] flex items-center gap-2">
                                        <div className="relative w-5 h-5">
                                            <Image
                                                src={"/icons/discount.svg"}
                                                alt="discount icon"
                                                fill
                                            />
                                        </div>
                                        <span className="text-xs lg:text-[16px] font-poppins-medium font-medium">
                                            {slider.sale}
                                        </span>
                                    </div>
                                )}

                                <h1 className="text-[20px] lg:text-[32px] font-poppins-semi-bold font-semibold text-white text-center lg:text-left">
                                    {slider.title}
                                </h1>
                                <p className="text-xs lg:text-sm font-medium font-poppins-medium text-white text-center lg:text-left">
                                    {slider.description}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="mt-11 flex flex-col items-center lg:items-start gap-5">
                    <Link
                        href={"/categories"}
                        className={`lg:hidden bg-tiny-pink px-9 py-3.5 rounded-xl ${
                            lang === "ar" ? "flex-row-reverse" : ""
                        } text-white font-poppins-semi-bold font-semibold text-sm`}
                    >
                        {lang === "ar" ? "تسوق الآن" : "Shop Now"}
                        {lang === "ar" ? (
                            <FaArrowLeft className="inline-block mr-2" />
                        ) : (
                            <FaArrowRight className="inline-block ml-2" />
                        )}{" "}
                    </Link>
                    <div className="lg:flex items-center gap-6 hidden">
                        <Link
                            href={"/categories"}
                            className={`bg-tiny-pink px-9 py-3.5 rounded-xl ${
                                lang === "ar" ? "flex-row-reverse" : ""
                            } text-white font-poppins-semi-bold font-semibold text-sm`}
                        >
                            {lang === "ar" ? "تسوق الآن" : "Shop Now"}
                            {lang === "ar" ? (
                                <FaArrowLeft className="inline-block mr-2" />
                            ) : (
                                <FaArrowRight className="inline-block ml-2" />
                            )}
                        </Link>

                        <div className="h-0.5 rounded-2xl bg-tiny-pink w-25" />

                        {communications && (
                            <div className="flex items-center gap-4 flex-wrap w-fit mx-auto">
                                {communications?.communication_instagram && (
                                    <Link
                                        href={
                                            communications.communication_instagram ||
                                            "#"
                                        }
                                        className="bg-white w-9 h-9 rounded-full p-2"
                                    >
                                        <FaInstagram className="text-tiny-black w-full h-full" />
                                    </Link>
                                )}
                                {communications?.communication_facebook && (
                                    <Link
                                        href={
                                            communications.communication_facebook ||
                                            "#"
                                        }
                                        className="bg-white w-9 h-9 rounded-full p-2"
                                    >
                                        <TbBrandFacebook className="text-tiny-black w-full h-full" />
                                    </Link>
                                )}
                                {communications?.communication_linkedin && (
                                    <Link
                                        href={
                                            communications.communication_linkedin ||
                                            "#"
                                        }
                                        className="bg-white w-9 h-9 rounded-full p-2"
                                    >
                                        <SlSocialLinkedin className="text-tiny-black w-full h-full" />
                                    </Link>
                                )}
                                {communications?.communication_telegram && (
                                    <Link
                                        href={
                                            communications.communication_telegram ||
                                            "#"
                                        }
                                        className="bg-white w-9 h-9 rounded-full p-2"
                                    >
                                        <RiTelegram2Line className="text-tiny-black w-full h-full" />
                                    </Link>
                                )}
                                {communications?.communication_whatsapp && (
                                    <Link
                                        href={
                                            `https://wa.me/${communications?.communication_whatsapp
                                                .split(" ")
                                                .join("")}` || "#"
                                        }
                                        className="bg-white w-9 h-9 rounded-full p-2"
                                    >
                                        <TbBrandWhatsapp className="text-tiny-black w-full h-full" />
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:hidden">
                    <div className="h-6 rounded-2xl bg-tiny-pink w-0.5 mx-auto my-2" />

                    {communications && (
                        <div className="flex items-center gap-3 flex-wrap w-fit mx-auto">
                            {communications?.communication_instagram && (
                                <Link
                                    href={
                                        communications.communication_instagram ||
                                        "#"
                                    }
                                    className="bg-white w-9 h-9 rounded-full p-2"
                                >
                                    <FaInstagram className="text-tiny-black w-full h-full" />
                                </Link>
                            )}
                            {communications?.communication_facebook && (
                                <Link
                                    href={
                                        communications.communication_facebook ||
                                        "#"
                                    }
                                    className="bg-white w-9 h-9 rounded-full p-2"
                                >
                                    <TbBrandFacebook className="text-tiny-black w-full h-full" />
                                </Link>
                            )}
                            {communications?.communication_linkedin && (
                                <Link
                                    href={
                                        communications.communication_linkedin ||
                                        "#"
                                    }
                                    className="bg-white w-9 h-9 rounded-full p-2"
                                >
                                    <SlSocialLinkedin className="text-tiny-black w-full h-full" />
                                </Link>
                            )}
                            {communications?.communication_telegram && (
                                <Link
                                    href={
                                        communications.communication_telegram ||
                                        "#"
                                    }
                                    className="bg-white w-9 h-9 rounded-full p-2"
                                >
                                    <RiTelegram2Line className="text-tiny-black w-full h-full" />
                                </Link>
                            )}
                            {communications?.communication_whatsapp && (
                                <Link
                                    href={
                                        `https://wa.me/${communications?.communication_whatsapp
                                            .split(" ")
                                            .join("")}` || "#"
                                    }
                                    className="bg-white w-9 h-9 rounded-full p-2"
                                >
                                    <TbBrandWhatsapp className="text-tiny-black w-full h-full" />
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <Image
                src={"/images/slider-img.webp"}
                alt="Slider Image"
                fill
                priority
                className={`z-0 object-cover object-center lg:hidden ${
                    lang === "ar" ? "scale-x-[-1]" : ""
                }`}
            />
            <Image
                src={"/images/large-slider-img.webp"}
                alt="Slider Image"
                fill
                priority
                className={`z-0 object-cover hidden lg:block ${
                    lang === "ar" ? "scale-x-[-1]" : ""
                }`}
            />
        </div>
    );
};

export default Slider;
