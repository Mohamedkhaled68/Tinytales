"use client";
import Image from "next/image";
import { IoMenu, IoClose } from "react-icons/io5";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const menuLinks = [
        { href: "/", label: "Home" },
        { href: "/", label: "Our Categories" },
        { href: "/", label: "About Us" },
        { href: "/", label: "Contact Us" },
        { href: "/", label: "FAQs" },
    ];

    return (
        <nav className="w-full p-5 shadow-[0px_0px_52px_-24px_#00000040] relative">
            <div className="container mx-auto flex justify-between items-center">
                <Image
                    src="/images/logo.svg"
                    alt="Tinytales Logo"
                    width={45}
                    height={35}
                    loading="eager"
                />
                <button
                    onClick={toggleMenu}
                    className="flex items-center justify-center h-11 w-11 rounded-full hover:bg-[#f4f4f4bb] transition ease-in-out duration-300"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
                </button>
            </div>

            {/* Dropdown Menu */}
            {isMenuOpen && (
                <div className="absolute right-5 top-20 bg-white shadow-lg rounded-lg py-2 min-w-50 z-50">
                    {menuLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="block px-6 py-3 text-gray-700 hover:bg-gray-100 transition duration-200"
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
