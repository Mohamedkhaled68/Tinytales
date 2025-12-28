"use client";
import { useState } from "react";

export default function FAQAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(1); // Second item open by default

    const faqData = [
        {
            question: "What is your return and exchange policy?",
            answer: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit yes et arnet, consectetuer' nit, sed diam nonummy dolor sit arnet, Lorem ipsum dolor sit arnet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit yes et arnet, consectetuer' elit, sed diam nonummy dolor sit arnet.",
        },
        {
            question: "How Can i Contact Customer Support For assistance?",
            answer: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit yes et arnet, consectetuer' nit, sed diam nonummy dolor sit arnet, Lorem ipsum dolor sit arnet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit yes et arnet, consectetuer' elit, sed diam nonummy dolor sit arnet.",
        },
        {
            question: "How do i Choose the right Product for my ?",
            answer: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit yes et arnet, consectetuer' nit, sed diam nonummy dolor sit arnet, Lorem ipsum dolor sit arnet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit yes et arnet, consectetuer' elit, sed diam nonummy dolor sit arnet.",
        },
        {
            question: "What is your return and exchange policy?",
            answer: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit yes et arnet, consectetuer' nit, sed diam nonummy dolor sit arnet, Lorem ipsum dolor sit arnet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit yes et arnet, consectetuer' elit, sed diam nonummy dolor sit arnet.",
        },
        {
            question: "How Can i Contact Customer Support For assistance?",
            answer: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit yes et arnet, consectetuer' nit, sed diam nonummy dolor sit arnet, Lorem ipsum dolor sit arnet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit yes et arnet, consectetuer' elit, sed diam nonummy dolor sit arnet.",
        },
    ];

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <div className="overflow-hidden flex flex-col gap-5">
                {faqData.map((item, index) => (
                    <div
                        key={index}
                        className={`${
                            openIndex === index
                                ? "bg-tiny-pink rounded-3xl"
                                : ""
                        }`}
                    >
                        <button
                            onClick={() => toggleAccordion(index)}
                            className={`cursor-pointer w-full flex rounded-3xl items-center justify-between p-5 text-left transition-colors ${
                                openIndex === index
                                    ? "bg-tiny-pink text-white"
                                    : "bg-[#F4F7F9] text-gray-800 hover:bg-gray-50"
                            }`}
                        >
                            <span className="text-sm font-medium pr-4">
                                {item.question}
                            </span>
                            <span
                                className={`text-2xl shrink-0 cursor-pointer ${
                                    openIndex === index
                                        ? "text-white"
                                        : "text-tiny-black"
                                }`}
                            >
                                {openIndex === index ? "−" : "+"}
                            </span>
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                openIndex === index
                                    ? "max-h-96 rounded-b-3xl"
                                    : "max-h-0"
                            }`}
                        >
                            <div
                                className={`p-5 text-sm leading-relaxed ${
                                    openIndex === index
                                        ? "bg-tiny-pink text-white"
                                        : "bg-white"
                                }`}
                            >
                                {item.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
