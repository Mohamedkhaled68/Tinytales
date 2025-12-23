"use client";
import Image from "next/image";
import { useState } from "react";

const colors = [
    { name: "red", bgColor: "#D90202" },
    { name: "blue", bgColor: "#B8CCDA" },
    { name: "green", bgColor: "#988755" },
    { name: "navy", bgColor: "#7198C8" },
    { name: "gray", bgColor: "#5D5D5B" },
];

const ProductDetails = () => {
    const [selectedColor, setSelectedColor] = useState<string | null>("red");

    return (
        <div className="flex flex-col gap-8">
            {/* Details */}
            <div className="flex flex-col">
                <div className="flex justify-between items-center">
                    <div className="rounded-4xl border-[0.5px] border-tiny-pink px-4 py-2 text-tiny-pink text-sm font-poppins-semi-bold font-semibold">
                        T-Shirt
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
                    J.VER Man Shirts Solid Long Sleeve Stretch Wrinkle-Free With
                    Blue
                </h1>
                <div className="flex items-center gap-2 mt-3">
                    <span className="font-poppins-medium font-medium text-xl text-tiny-black">
                        $300.00
                    </span>
                    <span className="font-poppins-regular font-normal text-[16px] text-tiny-black-200 line-through">
                        $360.00
                    </span>
                </div>
                <span className="font-poppins-regular font-normal text-xs text-tiny-black">
                    This price is exclusive of taxes.
                </span>
                <p className="mt-6 font-poppins-regular font-normal text-xs text-tiny-black">
                    Lorem ipsum dolor sit , consectetuer adipiscing elit, sed
                    diam nonummy Lorem ipsum dolor sit amet, diam nonummy
                </p>
            </div>

            {/* Divider */}
            <div className="bg-[#E6E6E6] rounded-lg h-px w-full" />

            {/* Actions */}
            <div className="flex flex-col gap-6">
                <div className="relative">
                    <div className="absolute -top-2 left-3 font-normal font-poppins-regular text-xs text-tiny-black bg-white px-2">
                        Type
                    </div>
                    <select
                        className="rounded-[10px] border-[0.5px] border-black/15 font-medium font-poppins-medium text-xs text-tiny-black px-5 py-3.5 w-full outline-none"
                        name="type"
                    >
                        <option value="">Select Type</option>
                        <option value="cotton">Cotton</option>
                        <option value="linen">Linen</option>
                        <option value="polyester">Polyester</option>
                    </select>
                </div>
                <div className="relative">
                    <div className="absolute -top-2 left-3 font-normal font-poppins-regular text-xs text-tiny-black bg-white px-2">
                        Size
                    </div>
                    <select
                        className="rounded-[10px] border-[0.5px] border-black/15 font-medium font-poppins-medium text-xs text-tiny-black px-5 py-3.5 w-full outline-none"
                        name="size"
                    >
                        <option value="">Select Size</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </div>

                <div className="flex flex-col gap-4">
                    <h1 className="text-tiny-black text-[16px] font-poppins-medium font-medium">
                        Colors
                    </h1>
                    <div className="flex items-center gap-2 relative pb-5">
                        {colors.map((color) => {
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
                                                backgroundColor: color.bgColor,
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

                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <h1 className="text-tiny-black text-[16px] font-poppins-medium font-medium">
                            Quantity
                        </h1>
                        <span className="text-tiny-black-200 text-xs font-poppins-regular font-normal">
                            ($300.00 for Piece)
                        </span>
                    </div>

                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center justify-between gap-5 lg:w-[50%]">
                            <div className="rounded-xl p-2 bg-[#F5F5F5] flex justify-between items-center w-full">
                                <div className="w-10 h-10 rounded-xl bg-white flex justify-center items-center cursor-pointer text-tiny-black-100 font-medium font-poppins-medium text-[28px]">
                                    -
                                </div>
                                <span className="text-tiny-black-100 font-medium font-poppins-medium text-[24px]">
                                    01
                                </span>
                                <div className="w-10 h-10 rounded-xl bg-white flex justify-center items-center cursor-pointer text-black font-medium font-poppins-medium text-[28px]">
                                    +
                                </div>
                            </div>
                            <span className="text-tiny-black-500 font-medium font-poppins-medium text-[24px]">
                                $300.00
                            </span>
                        </div>
                        <button className="cursor-pointer px-8 py-4 rounded-xl bg-tiny-pink font-medium font-poppins-medium text-white text-[16px] w-full lg:w-fit lg:mt-2 flex items-center justify-center gap-2">
                            <span>Add To Cart</span>
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
