"use client";

import Image from "next/image";
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { TbBrandWhatsappFilled } from "react-icons/tb";
import { FaTelegramPlane } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { RiPhoneFill } from "react-icons/ri";
import { IoLocationSharp } from "react-icons/io5";
import { useLanguage } from "@/contexts/LanguageContext";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCommunications } from "@/contexts/CommunicationsContext";
import { getToken } from "@/lib/token";

const Footer = () => {
    const { lang } = useLanguage();
    const { communications } = useCommunications();
    const [dic, setDic] = useState<any>(null);

    const token = getToken();

    const getDic = async () => {
        const dictionary = await getDictionary(lang as "en" | "ar");
        setDic(dictionary);
    };

    useEffect(() => {
        getDic();
    }, [lang]);

    return (
        <footer className="relative h-167.5 lg:h-80 w-full overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-tiny-black/70 z-10 flex flex-col lg:flex-row lg:items-start p-5 pt-8 lg:pt-15 lg:px-20">
                <div className="flex flex-col">
                    <Link href={"/"} className="relative w-22 h-11">
                        <Image
                            src="/images/favicon.svg"
                            alt="Tinytales Logo"
                            fill
                            loading="eager"
                        />
                    </Link>
                    <p className="text-xs font-normal font-poppins-regular leading-[140%] text-white/80 mt-6 lg:w-[75%]">
                        {dic?.footer.description ||
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy dolor sit amet, consectetuer adipiscing elit, sed diam nonummy"}
                    </p>
                </div>

                <div
                    className={`flex justify-between items-start ${
                        lang === "ar" ? "flex-row-reverse" : ""
                    } w-full text-white mt-8 lg:mt-0`}
                >
                    <div className="flex flex-col gap-5">
                        <h1 className="text-[16px] font-semibold font-poppins-semi-bold">
                            {dic?.footer.contact_us || "Contact Us"}
                        </h1>
                        <div className="flex flex-col gap-2 text-white/70 text-sm font-normal font-poppins-regular">
                            <Link
                                href={`https://wa.me/${communications?.communication_whatsapp}`}
                                className="flex items-center gap-2 hover:underline"
                            >
                                <RiPhoneFill size={24} color="#F0F0F0" />
                                <p style={{ direction: "ltr" }}>
                                    {communications?.communication_whatsapp ||
                                        ""}
                                </p>
                            </Link>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 flex justify-center items-center">
                                    <Image
                                        src={"/icons/email-icon.svg"}
                                        alt="Email Icon"
                                        width={20}
                                        height={16}
                                    />
                                </div>
                                <p>Named@gmail.com</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <IoLocationSharp size={24} color="#F0F0F0" />
                                <p>381, cairo, egypt </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <h1 className="text-[16px] font-semibold font-poppins-semi-bold">
                            {dic?.footer.let_us_help || "Let Us Help"}
                        </h1>
                        <div className="flex flex-col gap-4 text-white/70 text-sm font-normal font-poppins-regular">
                            {token && (
                                <Link
                                    className="hover:underline"
                                    href={"/profile"}
                                >
                                    {dic?.footer.my_account || "My Account"}
                                </Link>
                            )}
                            <Link className="hover:underline" href={"/FAQs"}>
                                {dic?.footer.faqs || "FAQs"}
                            </Link>

                            <p>
                                {dic?.footer.contact_support ||
                                    "Contact & Support"}
                            </p>
                            <Link
                                className="hover:underline"
                                href={"/categories"}
                            >
                                {dic?.footer.categories || "Categories"}
                            </Link>
                            <Link
                                className="hover:underline"
                                href={"/categories"}
                            >
                                {dic?.footer.all_products || "All Products"}
                            </Link>
                        </div>
                    </div>
                </div>

                <div
                    className={`flex flex-col lg:gap-6 w-full ${
                        lang === "ar" ? "lg:mr-20 mt-9" : "lg:ml-10"
                    }`}
                >
                    {/* Send Email */}
                    <div className="flex flex-col gap-6 mt-5 lg:mt-0">
                        <label
                            className="font-semibold font-poppins-semi-bold text-[16px] text-white"
                            htmlFor="footer-email"
                        >
                            {dic?.footer.send_email || "Send Email"}
                        </label>

                        <div className="rounded-xl border-[0.5px] border-black/10 text-xs flex items-center gap-2 p-1.5 bg-white">
                            <input
                                type="text"
                                id="footer-email"
                                placeholder={
                                    dic?.footer.email_placeholder ||
                                    "Email address"
                                }
                                className="outline-none border-none grow pl-4.5"
                            />
                            <button className="bg-tiny-pink rounded-xl border-[0.5px] border-black/10 px-6 py-3 font-semibold text-white">
                                {dic?.footer.send || "Send"}
                            </button>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="flex flex-col gap-3 mt-5 lg:mt-0">
                        <p className="text-xs font-semibold font-poppins-semi-bold text text-white">
                            {dic?.footer.follow_us || "Follow Us"}
                        </p>

                        {communications && (
                            <div className="flex gap-4 text-white">
                                {communications?.communication_facebook && (
                                    <Link
                                        href={
                                            communications?.communication_facebook ||
                                            "#"
                                        }
                                    >
                                        <FaFacebookF size={24} />
                                    </Link>
                                )}
                                {communications?.communication_twitter && (
                                    <Link
                                        href={
                                            communications?.communication_twitter ||
                                            "#"
                                        }
                                    >
                                        <FaTwitter size={24} />
                                    </Link>
                                )}

                                {communications?.communication_instagram && (
                                    <Link
                                        href={
                                            communications?.communication_instagram ||
                                            "#"
                                        }
                                    >
                                        <AiFillInstagram size={24} />
                                    </Link>
                                )}

                                {communications?.communication_linkedin && (
                                    <Link
                                        href={
                                            communications?.communication_linkedin ||
                                            "#"
                                        }
                                    >
                                        <FaLinkedinIn size={24} />
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
                                        <TbBrandWhatsappFilled size={24} />
                                    </Link>
                                )}

                                {communications?.communication_telegram && (
                                    <Link
                                        href={
                                            communications?.communication_telegram ||
                                            "#"
                                        }
                                    >
                                        <FaTelegramPlane size={24} />
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Image
                src={"/images/kid-img.webp"}
                alt="kid image"
                fill
                priority
                style={{ objectFit: "cover" }}
            />
        </footer>
    );
};

export default Footer;
