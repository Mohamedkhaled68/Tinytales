"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { useEffect, useState } from "react";

const HowItWork = () => {
    const { lang } = useLanguage();
    const [dic, setDic] = useState<any>(null);

    const getDic = async () => {
        const dictionary = await getDictionary(lang as "en" | "ar");
        setDic(dictionary);
    };

    useEffect(() => {
        getDic();
    }, [lang]);

    return (
        <section className={`mt-14 relative ${lang === "ar" ? "bg-linear-to-l" : "bg-linear-to-r"} lg:from-transparent from-black/30 lg:via-black/30 to-black/70`}>
            <div className=" py-12 w-[88%] lg:w-[65%] mx-auto ">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-2">
                        <h1 className="text-[32px] font-poppins-semi-bold font-semibold text-white">
                            {dic?.how_it_works.title || "How It Works"}
                        </h1>
                        <p className="text-white text-xs font-poppins-regular font-normal text-center lg:w-[55%] leading-normal mx-auto">
                            {dic?.how_it_works.description ||
                                "With simple steps, explore, choose, and order your products easily. From browsing to delivery, we provide a smooth and fast shopping experience!"}
                        </p>
                    </div>

                    <div
                        className={`flex gap-4.5 h-87.5 ${
                            lang === "ar" ? "mr-auto" : "ml-auto"
                        }`}
                    >
                        <div className="flex flex-col items-center justify-between relative h-full">
                            <div className="z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white text-tiny-black text-[16px] font-medium font-poppins-medium">
                                01
                            </div>
                            <div className="z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white text-tiny-black text-[16px] font-medium font-poppins-medium">
                                02
                            </div>
                            <div className="z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white text-tiny-black text-[16px] font-medium font-poppins-medium">
                                03
                            </div>
                            <div className="z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white text-tiny-black text-[16px] font-medium font-poppins-medium">
                                04
                            </div>
                            <div className="z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white text-tiny-black text-[16px] font-medium font-poppins-medium">
                                05
                            </div>
                            <div className="h-full w-0.5 bg-[#8C8C8C] rounded-[19px] absolute top-0 z-0" />
                        </div>
                        <div className="flex flex-col justify-between">
                            {dic?.how_it_works.steps?.map(
                                (step: any, index: number) => (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-2"
                                    >
                                        <h1 className="text-white text-sm font-semibold font-poppins-semi-bold">
                                            {step.title}
                                        </h1>
                                        <p className="text-white text-xs font-normal font-poppins-regular lg:w-[80%]">
                                            {step.description}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Image
                src={"/images/howitwork-img.webp"}
                fill
                priority
                alt="how-it-work"
                className={`hidden lg:block object-cover z-[-1] ${
                    lang === "ar" ? "scale-x-[-1]" : ""
                }`}
            />
            <Image
                src={"/images/sm-howitwork-img.webp"}
                fill
                priority
                alt="how-it-work"
                className={`lg:hidden object-cover z-[-1] ${
                    lang === "ar" ? "scale-x-[-1]" : ""
                }`}
            />
        </section>
    );
};

export default HowItWork;
