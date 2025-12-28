import Image from "next/image";
import FAQAccordion from "./FAQAccordion";

const Faqs = () => {
    return (
        <section className="mb-14 lg:my-14">
            <div className="flex flex-col items-center gap-0.5">
                <div className="relative w-fit">
                    <h1 className="font-poppins-semi-bold font-semibold text-[16px] lg:text-[24px] text-tiny-black">
                        FAQs
                    </h1>
                    <div className="absolute -left-4 lg:-left-2 -bottom-3 w-20 h-20 -z-1">
                        <Image
                            src={"/images/heading-logo.svg"}
                            alt="favicon"
                            fill
                        />
                    </div>
                </div>
                <div className="w-10 bg-tiny-pink h-1 rounded-2xl" />
                <p className="text-xs lg:text-[16px] text-tiny-black font-normal font-poppins-regular mt-3 text-center w-[85%] lg:w-[35%] mx-auto">
                    Here are answers to the most frequently asked questions
                    about our services.
                </p>
            </div>

            <div className="mt-9">
                <FAQAccordion />
            </div>
        </section>
    );
};

export default Faqs;
