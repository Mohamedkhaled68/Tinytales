import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { TbBrandFacebook } from "react-icons/tb";
import { SlSocialLinkedin } from "react-icons/sl";
import { RiTelegram2Line } from "react-icons/ri";
import { TbBrandWhatsapp } from "react-icons/tb";

const Slider = () => {
    return (
        <div className="relative min-h-120 lg:min-h-130 bg-tiny-black py-6 px-7">
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-l z-10 from-black/40 to-black/70   lg:bg-linear-to-l lg:from-[rgba(217,217,217,0)] via-black/70 lg:to-black/70" />
            <div className="absolute left-1/2 -translate-x-1/2 lg:left-30 lg:translate-x-0 w-[80%] lg:max-w-[50%] z-20 lg:top-16.75">
                {/* slider content */}
                <div className="flex flex-col items-center lg:items-start justify-center gap-4">
                    <div className="bg-white px-4 py-3.25 rounded-[40px] flex items-center gap-2">
                        <div className="relative w-5 h-5">
                            <Image
                                src={"/icons/discount.svg"}
                                alt="discount icon"
                                fill
                            />
                        </div>
                        <span className="text-xs lg:text-[16px] font-poppins-medium font-medium">
                            30% OFF Summer Super Sale
                        </span>
                    </div>
                    <h1 className="text-[20px] lg:text-[32px] font-poppins-semi-bold font-semibold text-white text-center lg:text-left">
                        Modern Style Boutique – Where Elegance Meets
                        Contemporary Fashion
                    </h1>
                    <p className="text-xs lg:text-sm font-medium font-poppins-medium text-white text-center lg:text-left">
                        Discover a curated collection of modern, elegant, and
                        trend-driven fashion pieces. From everyday wear to
                        standout styles, our boutique brings you the perfect
                        blend of comfort, quality, and style.
                    </p>
                </div>

                <div className="mt-6 flex flex-col items-center lg:items-start gap-5">
                    <div className="h-0.5 rounded-2xl bg-tiny-pink w-[20%] mx-auto lg:mx-0" />
                    <button className="lg:hidden bg-tiny-pink px-9 py-3.5 rounded-xl text-white font-poppins-semi-bold font-semibold text-sm">
                        Shop Now
                        <FaArrowRight className="inline-block ml-2" />
                    </button>
                    <div className="lg:flex items-center gap-6 hidden">
                        <button className="bg-tiny-pink px-9 py-3.5 rounded-xl text-white font-poppins-semi-bold font-semibold text-sm">
                            Shop Now
                            <FaArrowRight className="inline-block ml-2" />
                        </button>

                        <div className="h-0.5 rounded-2xl bg-tiny-pink w-25" />

                        <div className="flex items-center flex-wrap w-fit mx-auto">
                            <div className="bg-white w-9 h-9 rounded-full p-2">
                                <FaInstagram className="text-tiny-black w-full h-full" />
                            </div>
                            <div className="bg-white w-9 h-9 rounded-full p-2 mx-4">
                                <TbBrandFacebook className="text-tiny-black w-full h-full" />
                            </div>
                            <div className="bg-white w-9 h-9 rounded-full p-2">
                                <SlSocialLinkedin className="text-tiny-black w-full h-full" />
                            </div>
                            <div className="bg-white w-9 h-9 rounded-full p-2 mx-4">
                                <RiTelegram2Line className="text-tiny-black w-full h-full" />
                            </div>
                            <div className="bg-white w-9 h-9 rounded-full p-2">
                                <TbBrandWhatsapp className="text-tiny-black w-full h-full" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:hidden">
                    <div className="h-6 rounded-2xl bg-tiny-pink w-0.5 mx-auto my-2" />

                    <div className="flex items-center flex-wrap w-fit mx-auto">
                        <div className="bg-white w-9 h-9 rounded-full p-2">
                            <FaInstagram className="text-tiny-pink w-full h-full" />
                        </div>
                        <div className="bg-white w-9 h-9 rounded-full p-2 mx-4">
                            <TbBrandFacebook className="text-tiny-pink w-full h-full" />
                        </div>
                        <div className="bg-white w-9 h-9 rounded-full p-2">
                            <SlSocialLinkedin className="text-tiny-pink w-full h-full" />
                        </div>
                        <div className="bg-white w-9 h-9 rounded-full p-2 mx-4">
                            <RiTelegram2Line className="text-tiny-pink w-full h-full" />
                        </div>
                        <div className="bg-white w-9 h-9 rounded-full p-2">
                            <TbBrandWhatsapp className="text-tiny-pink w-full h-full" />
                        </div>
                    </div>
                </div>
            </div>

            <Image
                src={"/images/slider-img.webp"}
                alt="Slider Image"
                fill
                priority
                className="z-0 object-cover object-center lg:hidden"
            />
            <Image
                src={"/images/large-slider-img.webp"}
                alt="Slider Image"
                fill
                priority
                className="z-0 object-cover hidden lg:block"
            />
        </div>
    );
};

export default Slider;
