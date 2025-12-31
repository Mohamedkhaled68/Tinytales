"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Product } from "@/types/Product";
import Image from "next/image";
import { useState } from "react";

const colors = [
    { name: "red", bgColor: "#D90202" },
    { name: "blue", bgColor: "#B8CCDA" },
    { name: "green", bgColor: "#988755" },
    { name: "navy", bgColor: "#7198C8" },
    { name: "gray", bgColor: "#5D5D5B" },
];

const ProductDetails = ({ product }: { product: Product | null }) => {
    const [selectedColor, setSelectedColor] = useState<string | null>("red");
    const [quantity, setQuantity] = useState(1);
    const { lang } = useLanguage();

    const handleIncrement = () => {
        if (product?.stock && quantity < product.stock) {
            setQuantity((prev) => prev + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const totalPrice = product?.price
        ? (Number(product.price) * quantity).toFixed(2)
        : "0.00";

    return (
        <div className="flex flex-col gap-8 w-full">
            {/* Details */}
            <div className="flex flex-col">
                <div className="flex justify-between items-center">
                    <div className="rounded-4xl border-[0.5px] border-tiny-pink px-4 py-2 text-tiny-pink text-sm font-poppins-semi-bold font-semibold">
                        {product?.name}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="rounded-lg border border-[#4040401A] text-tiny-pink text-[10px] font-poppins-semibold font-semibold p-1.5">
                            <div className="relative w-5 h-5 flex justify-center items-center">
                                <Image
                                    src={"/icons/bag-outline.svg"}
                                    fill
                                    alt="bag-fill icon"
                                />
                            </div>
                        </div>
                        <div className="rounded-lg border border-[#4040401A] text-tiny-pink text-[10px] font-poppins-semibold font-semibold p-1.5">
                            <div className="relative w-5 h-5 flex justify-center items-center">
                                <Image
                                    src={"/icons/heart-outline.svg"}
                                    fill
                                    alt="heart-fill icon"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className="font-poppins-medium font-medium text-[16px] text-tiny-black mt-5">
                    {product?.description}
                </h1>
                <div className="flex items-center gap-2 mt-3">
                    <span
                        className={`flex items-center gap-1 font-poppins-medium font-medium text-xl text-tiny-black`}
                    >
                        <span>{product?.price}</span>
                        <span>{lang === "ar" ? "د.أ" : "AED"}</span>
                    </span>
                    <span
                        className={`flex items-center gap-1 font-poppins-regular font-normal text-[16px] text-tiny-black-200 line-through`}
                    >
                        <span>{product?.price_before_discount}</span>
                        <span>{lang === "ar" ? "د.أ" : "AED"}</span>
                    </span>
                </div>
                <span className="font-poppins-regular font-normal text-xs text-tiny-black">
                    {lang === "ar"
                        ? "السعر لا يشمل الضرائب."
                        : "This price is exclusive of taxes."}
                </span>
                <p className="mt-6 font-poppins-regular font-normal text-xs text-tiny-black">
                    {lang === "ar"
                        ? "اختر من بين مجموعة متنوعة من الخيارات لتخصيص منتجك حسب رغبتك."
                        : "Choose from a variety of options to customize your product to your liking."}
                </p>
            </div>

            {/* Divider */}
            <div className="bg-[#E6E6E6] rounded-lg h-px w-full" />

            {/* Actions */}
            <div className="flex flex-col gap-6">
                <div className="relative">
                    <div
                        className={`absolute -top-2 left-3 font-normal font-poppins-regular text-xs text-tiny-black bg-white px-2 ${
                            lang === "ar" ? "right-3 left-auto" : ""
                        }`}
                    >
                        {lang === "ar" ? "النوع" : "Type"}
                    </div>
                    <select
                        className="cursor-pointer rounded-[10px] border-[0.5px] border-black/15 font-medium font-poppins-medium text-xs text-tiny-black px-5 py-3.5 w-full outline-none"
                        name="type"
                    >
                        <option value="">
                            {lang === "ar" ? "اختر النوع" : "Select Type"}
                        </option>
                        <option value="cotton">
                            {lang === "ar" ? "قطن" : "Cotton"}
                        </option>
                        <option value="linen">
                            {lang === "ar" ? "كتان" : "Linen"}
                        </option>
                        <option value="polyester">
                            {lang === "ar" ? "بوليستر" : "Polyester"}
                        </option>
                    </select>
                </div>
                <div className="relative">
                    <div
                        className={`absolute -top-2 left-3 font-normal font-poppins-regular text-xs text-tiny-black bg-white px-2 ${
                            lang === "ar" ? "right-3 left-auto" : ""
                        }`}
                    >
                        {lang === "ar" ? "المقاس" : "Size"}
                    </div>
                    <select
                        className="cursor-pointer rounded-[10px] border-[0.5px] border-black/15 font-medium font-poppins-medium text-xs text-tiny-black px-5 py-3.5 w-full outline-none"
                        name="size"
                    >
                        <option value="">
                            {lang === "ar" ? "اختر المقاس" : "Select Size"}
                        </option>
                        <option value="small">
                            {lang === "ar" ? "صغير" : "Small"}
                        </option>
                        <option value="medium">
                            {lang === "ar" ? "متوسط" : "Medium"}
                        </option>
                        <option value="large">
                            {lang === "ar" ? "كبير" : "Large"}
                        </option>
                    </select>
                </div>

                {product?.color_list && product.color_list.length > 0 && (
                    <div className="flex flex-col gap-4">
                        <h1 className="text-tiny-black text-[16px] font-poppins-medium font-medium">
                            Colors
                        </h1>
                        <div className="flex items-center gap-2 relative pb-5">
                            {product?.color_list.map((color) => {
                                const isSelected = selectedColor === color.name;

                                return (
                                    <div
                                        className="flex flex-col items-center"
                                        key={color.name}
                                    >
                                        <div
                                            onClick={() =>
                                                setSelectedColor(color.name)
                                            }
                                            className={`
                                w-11 h-11 rounded-full
                                flex justify-center items-center cursor-pointer
                                bg-[#F4F7F9]
                                transition-all duration-200
                                ${
                                    isSelected
                                        ? "border-[1.5px] border-tiny-black"
                                        : "border border-transparent"
                                }
                            `}
                                        >
                                            <div
                                                className="w-6 h-6 rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        color.bgColor,
                                                }}
                                            />
                                        </div>
                                        {isSelected && (
                                            <span className="absolute bottom-0 text-center text-tiny-black-200 text-sm font-poppins-medium font-medium">
                                                {color.name}
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <h1 className="text-tiny-black text-[16px] font-poppins-medium font-medium">
                            {lang === "ar" ? "الكمية" : "Quantity"}
                        </h1>
                        <span className="text-tiny-black-200 text-xs font-poppins-regular font-normal flex items-center gap-1">
                            (
                            <span className="flex flex-row-reverse gap-0.5">
                                <span>{lang === "ar" ? "د.إ" : "AED"}</span>
                                <span>{product?.price}</span>
                            </span>
                            {lang === "ar" ? " لكل وحدة" : "for Piece"})
                        </span>
                    </div>

                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="grow flex items-center gap-4 lg:w-[50%]">
                            <div className="rounded-xl p-2 bg-[#F5F5F5] flex justify-between items-center w-[50%]">
                                <button
                                    onClick={handleDecrement}
                                    disabled={quantity === 1}
                                    className={`w-10 h-10 rounded-xl bg-white flex justify-center items-center font-medium font-poppins-medium text-[28px] transition-colors ${
                                        quantity === 1
                                            ? 'opacity-50 cursor-not-allowed text-tiny-black-100'
                                            : 'cursor-pointer text-tiny-black hover:bg-gray-100'
                                    }`}
                                >
                                    -
                                </button>
                                <span className="text-tiny-black-100 font-medium font-poppins-medium text-[24px]">
                                    {quantity.toString().padStart(2, "0")}
                                </span>
                                <button
                                    onClick={handleIncrement}
                                    disabled={product?.stock ? quantity >= product.stock : false}
                                    className={`w-10 h-10 rounded-xl bg-white flex justify-center items-center font-medium font-poppins-medium text-[28px] transition-colors ${
                                        product?.stock && quantity >= product.stock
                                            ? 'opacity-50 cursor-not-allowed text-tiny-black-100'
                                            : 'cursor-pointer text-tiny-black hover:bg-gray-100'
                                    }`}
                                >
                                    +
                                </button>
                            </div>
                            <span className="text-tiny-black-500 font-medium font-poppins-medium text-[24px]">
                                {lang === "ar" ? "د.إ" : "AED"} {totalPrice}
                            </span>
                        </div>
                        <button className={`cursor-pointer px-8 py-4 rounded-xl bg-tiny-pink font-medium font-poppins-medium text-white text-[16px] w-full lg:w-fit lg:mt-2 flex items-center ${lang === "ar" ? "flex-row-reverse" : ""} justify-center gap-2`}>
                            <span>{lang === "ar" ? "أضف إلى السلة" : "Add To Cart"}</span>
                            <div className="relative w-6 h-6 flex justify-center items-center">
                                <Image
                                    src={"/images/shop-bag.webp"}
                                    alt="shop bag icon"
                                    width={18.363021850585938}
                                    height={20.75}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
