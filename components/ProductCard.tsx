import Image from "next/image";
import { GiRoundStar } from "react-icons/gi";

interface ProductCardProps {
    image: string;
    liked: boolean;
    added: boolean;
}

const ProductCard = ({ image, liked, added }: ProductCardProps) => {
    return (
        <>
            <div className="flex flex-col gap-2 min-w-43 w-full">
                {/* Image & Offers */}
                <div className="rounded-[20px] border border-black/5 flex flex-col gap-4 overflow-hidden p-3">
                    <div className="flex items-center justify-between">
                        <div className="rounded-lg border border-[#4040401A] text-tiny-pink text-[10px] font-poppins-semibold font-semibold py-2 px-4">
                            25% OFF
                        </div>
                        <div className="flex items-center gap-1.25">
                            <div className="rounded-lg border w-8 h-8 border-[#4040401A] text-tiny-pink text-[10px] font-poppins-semibold font-semibold p-1.5">
                                <div className="relative w-5 h-5 flex justify-center items-center">
                                    {added ? (
                                        <Image
                                            src={"/icons/bag-fill.svg"}
                                            fill
                                            alt="bag-fill icon"
                                        />
                                    ) : (
                                        <Image
                                            src={"/icons/bag-outline.svg"}
                                            fill
                                            alt="bag-fill icon"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="rounded-lg border w-8 h-8 border-[#4040401A] text-tiny-pink text-[10px] font-poppins-semibold font-semibold p-1.5">
                                <div className="relative w-5 h-5 flex justify-center items-center">
                                    {liked ? (
                                        <Image
                                            src={"/icons/heart-fill.svg"}
                                            fill
                                            alt="heart-fill icon"
                                        />
                                    ) : (
                                        <Image
                                            src={"/icons/heart-outline.svg"}
                                            fill
                                            alt="heart-fill icon"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative w-full h-full aspect-4/5">
                        <Image
                            src={`/images/similar-item${image}.webp`}
                            fill
                            alt={`similar item ${image}`}
                            style={{ objectFit: "cover" }}
                            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <h1 className="font-poppins-medium font-medium text-xs text-tiny-black-300">
                            Dresses
                        </h1>

                        <div className="flex justify-between items-center gap-1">
                            <GiRoundStar size={13} className="text-tiny-pink" />
                            <span className="font-poppins-medium font-medium text-xs text-tiny-black">
                                4.5
                            </span>
                            <span className="font-poppins-regular font-normal text-[10px] text-tiny-black-300">
                                (2910)
                            </span>
                        </div>
                    </div>
                    <h1 className="font-poppins-medium font-medium text-[10px] lg:text-sm text-tiny-black">
                        J.VER Women's Dress Shirts Solid Long Sleeve Stretch
                        Wrinkle-Free With Yello ..
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="font-poppins-medium font-medium text-sm lg:text-[16px] text-tiny-black">
                            AED 900
                        </span>
                        <span className="font-poppins-medium font-medium text-xs lg:text-sm text-tiny-black-200 line-through">
                            AED 1300
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        <div className="w-5 h-5 rounded-full bg-tiny-pink" />
                        <div className="w-5 h-5 rounded-full bg-tiny-black-400" />
                        <div className="w-5 h-5 rounded-full bg-[#E8E8E8]" />
                        <span className="font-medium font-poppins-medium text-sm text-tiny-black">
                            +2
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;
