"use client";

import Image from "next/image";
import { FaArrowRight, FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import { RiTelegram2Line } from "react-icons/ri";
import { SlSocialLinkedin } from "react-icons/sl";
import { TbBrandFacebook, TbBrandWhatsapp, TbBrandWhatsappFilled } from "react-icons/tb";
import { useLanguage } from "@/contexts/LanguageContext";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCommunications } from "@/contexts/CommunicationsContext";
import { AiFillInstagram } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";

const Help = () => {
    const { lang } = useLanguage();
    const [dic, setDic] = useState<any>(null);
    const { communications } = useCommunications();
    const getDic = async () => {
        const dictionary = await getDictionary(lang as "en" | "ar");
        setDic(dictionary);
    };

    useEffect(() => {
        getDic();
    }, [lang]);

    return (
        <section className="hidden lg:block container mx-auto rounded-3xl overflow-hidden relative bg-linear-to-r from-transparent via-black/30 to-black/70">
            <div className="py-30 w-[55%] mx-auto ">
                <div className="flex flex-col items-center gap-5">
                    <div className="flex flex-col items-center gap-3">
                        <h1 className="text-[32px] font-poppins-semi-bold font-semibold text-white text-center">
                            {dic?.help.title ||
                                "Need Help? We're Always Here to Support You"}
                        </h1>
                        <p className="text-white text-xs font-poppins-regular font-normal lg:w-[55%] leading-normal mx-auto text-center">
                            {dic?.help.description ||
                                "Whether you have a question, need guidance, or just want to talk to someone — our team is always ready to support you. Don't hesitate to reach out."}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href={"/contact"}
                            className={`flex items-center ${
                                lang === "ar" ? "flex-row-reverse" : ""
                            } cursor-pointer bg-white px-5 py-3 rounded-4xl text-xs text-tiny-black font-poppins-semi-bold font-semibold`}
                        >
                            {dic?.help.contact_us_now || "Contact Us Now"}
                            <FaArrowRight className="inline-block ml-2" />
                        </Link>
                        <div className="h-0.5 rounded-3xl bg-white w-25" />
                        {communications && (
                            <div className="flex gap-2 text-white">
                                {communications?.communication_facebook && (
                                    <Link
                                        href={
                                            communications?.communication_facebook ||
                                            "#"
                                        }
                                    >
                                        <FaFacebookF size={20} />
                                    </Link>
                                )}
                                {communications?.communication_twitter && (
                                    <Link
                                        href={
                                            communications?.communication_twitter ||
                                            "#"
                                        }
                                    >
                                        <FaTwitter size={20} />
                                    </Link>
                                )}

                                {communications?.communication_instagram && (
                                    <Link
                                        href={
                                            communications?.communication_instagram ||
                                            "#"
                                        }
                                    >
                                        <AiFillInstagram size={20} />
                                    </Link>
                                )}

                                {communications?.communication_linkedin && (
                                    <Link
                                        href={
                                            communications?.communication_linkedin ||
                                            "#"
                                        }
                                    >
                                        <FaLinkedinIn size={20} />
                                    </Link>
                                )}

                                {communications?.communication_whatsapp && (
                                    <Link
                                        href={
                                            `https://wa.me/${communications?.communication_whatsapp
                                                .split(" ")
                                                .join("")}` || "#"
                                        }
                                    >
                                        <TbBrandWhatsappFilled size={20} />
                                    </Link>
                                )}

                                {communications?.communication_telegram && (
                                    <Link
                                        href={
                                            communications?.communication_telegram ||
                                            "#"
                                        }
                                    >
                                        <FaTelegramPlane size={20} />
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Image
                src={"/images/kid-img.webp"}
                fill
                priority
                alt="how-it-work"
                className="object-cover z-[-1] scale-x-[-1]"
            />
        </section>
    );
};

export default Help;
