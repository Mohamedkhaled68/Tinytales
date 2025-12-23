"use client";
import Image from "next/image";
import {
    IoMenu,
    IoClose,
    IoSearchOutline,
    IoCartOutline,
    IoHeartOutline,
} from "react-icons/io5";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const menuLinks = [
        { href: "/", label: "Home", icon: "/icons/home.svg" },
        { href: "/", label: "Our Categories", icon: "/icons/categories.svg" },
        { href: "/", label: "About Us", icon: "/icons/about.svg" },
        { href: "/", label: "Contact Us", icon: "/icons/contact.svg" },
        { href: "/", label: "FAQs", icon: "/icons/faq.webp" },
    ];

    return (
        <nav className="w-full p-5 shadow-[0px_0px_52px_-24px_#00000040] relative bg-white">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Image
                    src="/images/logo.svg"
                    alt="Tinytales Logo"
                    width={45}
                    height={35}
                    loading="eager"
                />

                {/* Desktop Navigation Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {menuLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-tiny-black-200 hover:text-blue-600 transition duration-200 text-sm font-normal font-poppins-regular"
                        >
                            <Image
                                src={link.icon}
                                alt={`${link.label} icon`}
                                width={16}
                                height={16}
                                className="inline-block mr-2"
                            />
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Desktop Icons */}
                <div className="hidden lg:flex items-center">
                    <button className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition duration-200">
                        <BsHandbag size={22} className="text-tiny-black" />
                    </button>
                    <button className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition duration-200">
                        <svg
                            className="w-5 h-5 text-tiny-black"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                        </svg>
                    </button>
                    <button className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition duration-200">
                        <IoHeartOutline size={22} className="text-tiny-black" />
                    </button>
                    <button className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition duration-200">
                        <IoCartOutline size={22} className="text-tiny-black" />
                    </button>
                    <button className="flex items-center gap-1 px-3 py-2 rounded-full hover:bg-gray-100 transition duration-200">
                        <span className="text-sm font-medium text-tiny-black">
                            EN
                        </span>
                        <svg
                            className="w-4 h-4 text-tiny-black"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    <Link
                        href={"/auth/register"}
                        className="cursor-pointer flex items-center gap-1 px-3 py-2 rounded-full hover:bg-gray-100 transition duration-200"
                    >
                        <MdOutlineAccountCircle
                            size={24}
                            className="text-tiny-black"
                        />
                        <svg
                            className="w-4 h-4 text-tiny-black"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="lg:hidden flex items-center justify-center h-11 w-11 rounded-full hover:bg-[#f4f4f4bb] transition ease-in-out duration-300"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute right-5 top-20 bg-white shadow-lg rounded-lg py-2 min-w-50 z-50">
                    {menuLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="block px-6 py-3 text-tiny-black hover:bg-gray-100 transition duration-200"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
