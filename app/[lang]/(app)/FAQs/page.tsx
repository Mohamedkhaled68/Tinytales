"use client";
import FAQAccordion from "@/components/landing/FAQAccordion";
import Loading from "@/components/ui/Loading";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGetFAQs } from "@/hooks/useGetFAQs";
import Image from "next/image";

const page = () => {
    const { lang } = useLanguage();
    const { faqs, isLoading } = useGetFAQs();
    return (
        <div className="container mx-auto px-4 pb-10">
            {isLoading ? (
                <>
                    <div className="w-full h-screen flex justify-center items-center">
                        <Loading width="100" height="100" />
                    </div>
                </>
            ) : faqs.length === 0 ? (
                <>
                    <div className="w-full h-[50vh] flex items-center justify-center">
                        <div className="flex flex-col items-center">
                            <div className="relative w-24 h-24">
                                <Image
                                    src={"/icons/empty-box.webp"}
                                    fill
                                    alt="empty-box"
                                />
                            </div>
                            <span className="mt-4 text-tiny-black font-poppins-medium font-medium text-base">
                                {lang === "ar"
                                    ? "لا توجد عناصر متاحة في هذه الفئة حتى الآن. يرجى التحقق مرة أخرى لاحقًا للحصول على التحديثات!"
                                    : "No items available in this category yet. Please check back later for updates!"}
                            </span>
                        </div>
                    </div>
                    ss
                </>
            ) : (
                <>
                    <FAQAccordion faqs={faqs} />
                </>
            )}
        </div>
    );
};

export default page;
