"use client";
import { FAQ } from "@/types/Home";
import { useState } from "react";

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(1); // Second item open by default

    const toggleAccordion = (id: number) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    return (
        <div className="w-full mx-auto p-4">
            <div className="overflow-hidden flex flex-col gap-5">
                {faqs?.map((item, index) => (
                    <div
                        key={item.id}
                        className={`${
                            openIndex === item.id
                                ? "bg-tiny-pink rounded-3xl"
                                : ""
                        }`}
                    >
                        <button
                            onClick={() => toggleAccordion(item.id)}
                            className={`cursor-pointer w-full flex rounded-3xl items-center justify-between p-5 text-left transition-colors ${
                                openIndex === item.id
                                    ? "bg-tiny-pink text-white"
                                    : "bg-[#F4F7F9] text-gray-800 hover:bg-gray-50"
                            }`}
                        >
                            <span className="text-sm font-medium pr-4">
                                {item.question}
                            </span>
                            <span
                                className={`text-2xl shrink-0 cursor-pointer ${
                                    openIndex === item.id
                                        ? "text-white"
                                        : "text-tiny-black"
                                }`}
                            >
                                {openIndex === item.id ? "−" : "+"}
                            </span>
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                openIndex === item.id
                                    ? "max-h-96 rounded-b-3xl"
                                    : "max-h-0"
                            }`}
                        >
                            <div
                                className={`p-5 text-sm leading-relaxed ${
                                    openIndex === item.id
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
