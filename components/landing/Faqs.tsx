import Image from "next/image";
import FAQAccordion from "./FAQAccordion";
import { FAQ } from "@/types/Home";
import { useLanguage } from "@/contexts/LanguageContext";

const Faqs = ({ faqs }: { faqs: FAQ[] }) => {
    const { lang } = useLanguage();
    return (
        <section className="mb-14 lg:my-14">
            <div className="flex flex-col items-center gap-0.5">
                <div className="relative w-fit">
                    <h1 className="font-poppins-semi-bold font-semibold text-[16px] lg:text-[24px] text-tiny-black">
                        {lang === "ar" ? "الأسئلة الشائعة" : "FAQs"}
                    </h1>
                    <div
                        className={`${
                            lang === "ar"
                                ? "right-6 scale-x-[-1] -bottom-1"
                                : "left-0 -bottom-3"
                        } absolute -left-4 lg:-left-2 w-20 h-20 -z-1`}
                    >
                        <Image
                            src={"/images/heading-logo.svg"}
                            alt="favicon"
                            fill
                        />
                    </div>
                </div>
                <div className="w-10 bg-tiny-pink h-1 rounded-2xl" />
                <p className="text-xs lg:text-[16px] text-tiny-black font-normal font-poppins-regular mt-3 text-center w-[85%] lg:w-[35%] mx-auto">
                    {lang === "ar"
                        ? `إليك إجابات على أكثر الأسئلة شيوعًا حول خدماتنا.`
                        : `Here are answers to the most frequently asked questions
                    about our services.`}
                </p>
            </div>

            <div className="mt-9">
                <FAQAccordion faqs={faqs} />
            </div>
        </section>
    );
};

export default Faqs;
