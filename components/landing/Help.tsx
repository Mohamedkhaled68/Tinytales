import Image from "next/image";
import { FaArrowRight, FaInstagram } from "react-icons/fa6";
import { RiTelegram2Line } from "react-icons/ri";
import { SlSocialLinkedin } from "react-icons/sl";
import { TbBrandFacebook, TbBrandWhatsapp } from "react-icons/tb";

const Help = () => {
    return (
        <section className="hidden lg:block container mx-auto rounded-3xl overflow-hidden relative bg-linear-to-r from-transparent via-black/30 to-black/70">
            <div className="py-30 w-[55%] mx-auto ">
                <div className="flex flex-col items-center gap-5">
                    <div className="flex flex-col items-center gap-3">
                        <h1 className="text-[32px] font-poppins-semi-bold font-semibold text-white text-center">
                            Need Help? We’re Always<br /> Here to Support You
                        </h1>
                        <p className="text-white text-xs font-poppins-regular font-normal lg:w-[55%] leading-normal mx-auto text-center">
                            Whether you have a question, need guidance, or just
                            want to talk to someone — our team is always ready
                            to support you. Don’t hesitate to reach out.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="cursor-pointer bg-white px-5 py-3 rounded-4xl text-xs text-tiny-black font-poppins-semi-bold font-semibold">
                            Contact Us Now
                            <FaArrowRight className="inline-block ml-2" />
                        </button>
                        <div className="h-0.5 rounded-3xl bg-white w-25" />
                        <div className="flex items-center gap-2">
                            <FaInstagram size={20} className="text-white" />
                            <TbBrandFacebook size={20} className="text-white" />
                            <SlSocialLinkedin
                                size={20}
                                className="text-white"
                            />
                            <RiTelegram2Line size={20} className="text-white" />
                            <TbBrandWhatsapp size={20} className="text-white" />
                        </div>
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
