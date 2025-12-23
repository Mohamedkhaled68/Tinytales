import Image from "next/image";
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { TbBrandWhatsappFilled } from "react-icons/tb";
import { FaTelegramPlane } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { RiPhoneFill } from "react-icons/ri";
import { IoLocationSharp } from "react-icons/io5";
const Footer = () => {
    return (
        <footer className="relative h-167.5 w-full overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-tiny-black/70 z-10 flex flex-col p-5 pt-8">
                <Image
                    src="/images/favicon.svg"
                    alt="Tinytales Logo"
                    width={45}
                    height={35}
                    loading="eager"
                />
                <p className="text-xs font-normal font-poppins-regular leading-[140%] text-white/80 mt-6">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy Lorem ipsum dolor sit amet, consectetuer
                    adipiscing elit, sed diam nonummy dolor sit amet,
                    consectetuer adipiscing elit, sed diam nonummy
                </p>

                <div className="flex justify-between items-start w-full text-white mt-8">
                    <div className="flex flex-col gap-5">
                        <h1 className="text-[16px] font-semibold font-poppins-semi-bold">
                            Contact Us
                        </h1>
                        <div className="flex flex-col gap-2 text-white/70 text-sm font-normal font-poppins-regular">
                            <div className="flex items-center gap-2">
                                <RiPhoneFill size={24} color="#F0F0F0" />
                                <p>+87 01928491</p>
                            </div>
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
                            Let Us Help
                        </h1>
                        <div className="flex flex-col gap-4 text-white/70 text-sm font-normal font-poppins-regular">
                            <p>My Account</p>
                            <p>FAQs</p>
                            <p>Contact & Support</p>
                            <p>Categories</p>
                            <p>All Products</p>
                        </div>
                    </div>
                </div>

                {/* Send Email */}
                <div className="flex flex-col gap-6 mt-5">
                    <label
                        className="font-semibold font-poppins-semi-bold text-[16px] text-white"
                        htmlFor="footer-email"
                    >
                        Send Email
                    </label>

                    <div className="rounded-xl border-[0.5px] border-black/10 text-xs flex items-center gap-2 p-1.5 bg-white">
                        <input
                            type="text"
                            id="footer-email"
                            placeholder="Email address"
                            className="outline-none border-none grow pl-4.5"
                        />
                        <button className="bg-tiny-pink rounded-xl border-[0.5px] border-black/10 px-6 py-3 font-semibold text-white">
                            Send
                        </button>
                    </div>
                </div>

                {/* Social Media */}
                <div className="flex flex-col gap-3 mt-5">
                    <p className="text-xs font-semibold font-poppins-semi-bold text text-white">
                        Follow Us
                    </p>

                    <div className="flex gap-4 text-white">
                        <FaFacebookF size={24} />
                        <FaTwitter size={24} />
                        <AiFillInstagram size={24} />
                        <FaLinkedinIn size={24} />
                        <TbBrandWhatsappFilled size={24} />
                        <FaTelegramPlane size={24} />
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
